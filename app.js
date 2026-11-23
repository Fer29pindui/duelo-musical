import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const db = createClient(
  "https://wjzodrfdcbizvmpqjdrz.supabase.co",
  "sb_publishable_SvYab-gXlEgKJni4WIuyfQ_CCaflZaV"
);
const $ = id => document.getElementById(id);
const CANCIONES = [
  {id:"c01",titulo:"Vivir mi vida",artista:"Marc Anthony"},
  {id:"c02",titulo:"Danza Kuduro",artista:"Don Omar, Lucenzo"},
  {id:"c03",titulo:"Titanium",artista:"David Guetta, Sia"},
  {id:"c04",titulo:"Don't Stop Me Now",artista:"Queen"},
  {id:"c05",titulo:"La vida es un carnaval",artista:"Celia Cruz"},
  {id:"c06",titulo:"A Sky Full of Stars",artista:"Coldplay"},
  {id:"c07",titulo:"Blinding Lights",artista:"The Weeknd"},
  {id:"c08",titulo:"Mr. Brightside",artista:"The Killers"},
  {id:"c09",titulo:"Me rehúso",artista:"Danny Ocean"},
  {id:"c10",titulo:"Wake Me Up",artista:"Avicii"},
  {id:"c11",titulo:"Otro atardecer",artista:"Bad Bunny, The Marías"},
  {id:"c12",titulo:"Lamento boliviano",artista:"Enanitos Verdes"}
];
const CONSIGNAS = [
  "Una canción para animar una fiesta",
  "Una canción para cantar a todo pulmón",
  "Una canción para un viaje con amigos"
];
const ETAPAS = {
  espera:"SALA DE ESPERA",seleccion:"ELIGE TU CANCIÓN",
  votacion:"VOTA POR TU FAVORITA",resultados:"RESULTADOS DE LA RONDA",
  finalizada:"RANKING FINAL"
};
let estado = null, codigoSala = "", listo = false, ocupado = false;
let consultando = false, revisionVista = "", plazoLocal = null;
function recuperar(clave, defecto) {
  try { return JSON.parse(sessionStorage.getItem(clave)) ?? defecto; }
  catch { return defecto; }
}
const mediciones = recuperar("duelo-mediciones-v2", []);
const registrosImportados = recuperar("duelo-importados-v2", []);
const resultadosCasos = recuperar("duelo-casos-v2", {});
const cancionesOcupadas = new Set();
let turnoOcupadas = "";
const mensaje = (texto = "") => {
  $("mensaje").textContent = texto;
  $("mensaje").hidden = !texto;
};
const cancion = id => CANCIONES.find(c => c.id === id) || {titulo:"Canción desconocida",artista:""};

function elemento(tag, texto, clase) {
  const nodo = document.createElement(tag);
  if (texto !== undefined) nodo.textContent = texto;
  if (clase) nodo.className = clase;
  return nodo;
}
function boton(texto, accion, desactivado = false, motivo = "") {
  const nodo = elemento("button", texto);
  nodo.type = "button";
  nodo.disabled = desactivado && !motivo;
  if (desactivado && motivo) nodo.setAttribute("aria-disabled", "true");
  nodo.addEventListener("click", () => {
    if (nodo.getAttribute("aria-disabled") === "true") { mensaje(motivo); return; }
    accion();
  });
  return nodo;
}
function actualizarBotones() {
  $("crear").disabled = !listo || ocupado;
  $("unirse").disabled = !listo || ocupado;
  $("iniciar").disabled = ocupado || !estado || estado.participantes.length < 3;
  $("salir").disabled = ocupado;
}
async function solicitar(accion, {
  codigo = codigoSala, valor = "", ronda = null, nombre = ""
} = {}) {
  const inicio = performance.now();
  let correcta = false, detalle = "";
  const salaMedida = codigo;
  const jugadorMedido = estado?.participantes.find(p => p.soy_yo)?.nombre || nombre || "Este navegador";
  try {
    const {data,error} = await db.rpc("duelo", {
      p_accion:accion,p_codigo:codigo,p_nombre:nombre,
      p_valor:valor,p_ronda:ronda
    });
    if (error) throw error;
    if (!data) throw new Error("El servidor no devolvió datos.");
    if (data.codigo) aplicarEstado(data);
    if (data.error) {
      if (accion === "elegir" && data.error.includes("ya eligió esa canción")) {
        cancionesOcupadas.add(valor); revisionVista = "";
      }
      throw new Error(data.error);
    }
    correcta = true;
    return data;
  } catch (error) {
    detalle = error.message || "Error de conexión";
    throw error;
  } finally {
    mediciones.push({
      fecha:new Date().toISOString(),accion,aceptada:correcta,
      sala:salaMedida || estado?.codigo || "", jugador:jugadorMedido,
      ronda:ronda ?? estado?.ronda ?? 0, detalle,
      duracion_ms:Number((performance.now()-inicio).toFixed(2))
    });
    guardarPanel(); actualizarPanel();
  }
}
async function ejecutar(accion, opciones = {}) {
  if (ocupado) return;
  ocupado = true; actualizarBotones(); mensaje();
  try {
    while (consultando) await new Promise(r => setTimeout(r,40));
    const respuesta = await solicitar(accion,opciones);
    if (respuesta.salio) {
      codigoSala = ""; sessionStorage.removeItem("duelo-sala");
      estado = null; revisionVista = ""; plazoLocal = null;
      $("inicio").hidden = false; $("juego").hidden = true;
      $("conexion").textContent = "Conectado. Puedes crear otra partida.";
    } else if (respuesta.codigo) {
      codigoSala = respuesta.codigo;
      sessionStorage.setItem("duelo-sala",codigoSala);
    }
  } catch (error) {
    mensaje(error.message || "No se pudo completar la acción.");
  } finally {
    ocupado = false; revisionVista = "";
    if (estado) renderizar();
    actualizarBotones();
  }
}
function aplicarEstado(datos) {
  const turno = datos.codigo + ":" + datos.ronda;
  if (turno !== turnoOcupadas) { cancionesOcupadas.clear(); turnoOcupadas = turno; }
  estado = datos;
  plazoLocal = datos.fin_etapa
    ? performance.now() + Math.max(0,Date.parse(datos.fin_etapa)-Date.parse(datos.servidor))
    : null;
  renderizar();
}
function renderizar() {
  if (!estado) return;
  $("inicio").hidden = true; $("juego").hidden = false;
  $("codigo-sala").textContent = estado.codigo;
  $("etapa").textContent = ETAPAS[estado.estado] +
    (estado.ronda ? " · RONDA " + estado.ronda + "/3" : "");
  $("iniciar").hidden = !(estado.estado === "espera" && estado.soy_anfitrion);
  $("salir").textContent = estado.estado === "finalizada" ? "Volver al inicio" : "Salir";
  const lista = $("participantes"); lista.replaceChildren();
  for (const p of estado.participantes) {
    const etiquetas = [p.soy_yo?"tú":"",p.anfitrion?"anfitrión":""].filter(Boolean);
    lista.append(elemento("li",p.nombre +
      (etiquetas.length?" ("+etiquetas.join(", ")+")":"") + " · "+p.puntos+" puntos"));
  }
  const propia = estado.propuestas.find(p => p.mia);
  const firma = JSON.stringify({
    etapa:estado.estado,ronda:estado.ronda,propia:propia?.id,
    yaVote:estado.ya_vote,propuestas:estado.propuestas,
    ocupadas:[...cancionesOcupadas]
  });
  if (estado.estado === "espera") {
    $("consigna").textContent = "Comparte el código con tus amigos";
    $("instrucciones").textContent = estado.participantes.length+"/6 jugadores. "+
      (estado.soy_anfitrion?"Puedes iniciar cuando haya al menos 3.":"Espera a que el anfitrión inicie.");
  } else if (estado.estado === "seleccion") {
    $("consigna").textContent = CONSIGNAS[estado.ronda-1];
    $("instrucciones").textContent = estado.seleccionados+"/"+estado.participantes.length+
      " canciones enviadas. La votación comienza cuando todos elijan.";
  } else if (estado.estado === "votacion") {
    $("consigna").textContent = CONSIGNAS[estado.ronda-1];
    $("instrucciones").textContent = estado.ya_vote
      ? "Voto registrado. "+estado.votos+"/"+estado.participantes.length+" votos."
      : "Tienes 30 segundos. No puedes votar por tu canción.";
  } else if (estado.estado === "resultados") {
    $("consigna").textContent = "Así quedó esta ronda";
    $("instrucciones").textContent = "Cada voto recibido suma 1 punto. El juego avanzará automáticamente.";
  } else {
    $("consigna").textContent = "¡Tenemos resultado!";
    $("instrucciones").textContent = "Puntos acumulados de las tres rondas.";
  }
  if (firma !== revisionVista) {
    revisionVista = firma;
    const contenido = $("contenido"); contenido.replaceChildren();
    if (estado.estado === "espera") {
      contenido.append(elemento("p","Cada jugador abre el mismo enlace en su dispositivo e ingresa este código."));
      contenido.append(boton("Copiar código",async () => {
        try { await navigator.clipboard.writeText(estado.codigo); mensaje("Código copiado."); }
        catch { mensaje("Tu código es "+estado.codigo); }
      }));
      contenido.append(boton("Copiar invitación",async () => {
        const enlace = new URL(location.href);
        enlace.search = ""; enlace.hash = "";
        enlace.searchParams.set("sala",estado.codigo);
        const invitacion = "¡Únete al duelo musical! "+enlace.href+" — Código: "+estado.codigo;
        try { await navigator.clipboard.writeText(invitacion); mensaje("Invitación copiada: envíala a tus amigos."); }
        catch { mensaje(invitacion); }
      }));
    } else if (estado.estado === "seleccion") {
      if (propia) {
        const tema = cancion(propia.cancion_id);
        contenido.append(elemento("p","✓ Enviaste: "+tema.titulo+" — "+tema.artista+". Esperando al grupo."));
        contenido.append(elemento("p","Tu selección está confirmada: solo puedes enviar una canción por ronda y no puedes cambiarla.","aviso-regla"));
      } else {
        const etiqueta = elemento("label","Buscar canción"); etiqueta.htmlFor = "busqueda";
        const buscador = elemento("input"); buscador.id = "busqueda";
        buscador.placeholder = "Título o artista"; buscador.autocomplete = "off";
        const catalogo = elemento("div",undefined,"catalogo");
        contenido.append(etiqueta,buscador,catalogo);
        const rondaVisible = estado.ronda;
        function dibujarCatalogo() {
          catalogo.replaceChildren();
          const consulta = buscador.value.trim().toLocaleLowerCase();
          const temas = CANCIONES.filter(t => (t.titulo+" "+t.artista).toLocaleLowerCase().includes(consulta));
          for (const tema of temas) {
            const tarjeta = elemento("div",undefined,"cancion");
            const ocupada = cancionesOcupadas.has(tema.id);
            const motivo = "Esta canción ya fue elegida por otro participante en esta ronda. Selecciona otra.";
            tarjeta.append(elemento("strong",tema.titulo),elemento("p",tema.artista),
              boton(ocupada ? "Canción ya seleccionada" : "Elegir canción",() => {
                if (confirm('¿Enviar "'+tema.titulo+'"? No podrás cambiarla.'))
                  ejecutar("elegir",{valor:tema.id,ronda:rondaVisible});
              },ocupado || ocupada, ocupada ? motivo : ""));
            if (ocupada) tarjeta.append(elemento("p",motivo,"aviso-regla"));
            catalogo.append(tarjeta);
          }
          if (!temas.length) catalogo.append(elemento("p","No hay coincidencias."));
        }
        buscador.addEventListener("input",dibujarCatalogo); dibujarCatalogo();
      }
    } else if (estado.estado === "votacion") {
      const rondaVisible = estado.ronda;
      for (const propuesta of estado.propuestas) {
        const tema = cancion(propuesta.cancion_id);
        const tarjeta = elemento("div",undefined,"cancion");
        const motivo = propuesta.mia
          ? "Esta es tu canción. No puedes votar por tu propia propuesta; elige la de otro participante."
          : estado.ya_vote ? "Tu voto ya fue registrado. Solo se permite un voto por ronda y no puede cambiarse." : "";
        tarjeta.append(elemento("strong",tema.titulo),elemento("p",tema.artista),
          boton(propuesta.mia?"Tu canción":estado.ya_vote?"Voto ya registrado":"Votar",() => {
            if (confirm('¿Confirmar voto por "'+tema.titulo+'"?'))
              ejecutar("votar",{valor:propuesta.id,ronda:rondaVisible});
          },ocupado || propuesta.mia || estado.ya_vote,motivo));
        if (motivo) tarjeta.append(elemento("p",motivo,"aviso-regla"));
        contenido.append(tarjeta);
      }
    } else if (estado.estado === "resultados") {
      for (const propuesta of [...estado.propuestas].sort((a,b) => b.puntos-a.puntos)) {
        const tarjeta = elemento("div",undefined,"cancion");
        tarjeta.append(elemento("strong",cancion(propuesta.cancion_id).titulo),
          elemento("p",propuesta.autor+" · "+propuesta.puntos+" puntos"));
        contenido.append(tarjeta);
      }
    } else if (estado.estado === "finalizada") {
      const jugadores = estado.participantes;
      const maximo = Math.max(...jugadores.map(p => p.puntos));
      const ganadores = jugadores.filter(p => p.puntos === maximo).map(p => p.nombre);
      contenido.append(elemento("h3",ganadores.length>1
        ? "🏆 Empate: "+ganadores.join(", ") : "🏆 Ganador: "+ganadores[0]));
      for (const p of jugadores) {
        const puesto = 1+jugadores.filter(otro => otro.puntos>p.puntos).length;
        contenido.append(elemento("p",puesto+". "+p.nombre+" — "+p.puntos+" puntos"));
      }
      contenido.append(boton("Ver panel de pruebas y tiempos",abrirPanel));
      contenido.append(boton("Descargar respaldo JSON",descargar));
    }
  }
  actualizarBotones(); dibujarTiempo();
}
function dibujarTiempo() {
  if (!estado || plazoLocal === null) { $("temporizador").textContent = ""; return; }
  const segundos = Math.max(0,Math.ceil((plazoLocal-performance.now())/1000));
  $("temporizador").textContent = estado.estado === "resultados"
    ? "Siguiente etapa en "+segundos+" s" : segundos+" s";
  $("temporizador").classList.toggle("urgente",estado.estado === "votacion" && segundos<=5);
  if (estado.estado === "votacion" && segundos === 0) {
    for (const control of $("contenido").querySelectorAll("button")) control.disabled = true;
    $("instrucciones").textContent = "El tiempo para votar terminó. La votación está cerrada; esperando los resultados del servidor.";
  }
}
async function consultar() {
  if (!codigoSala || ocupado || consultando || document.hidden) return;
  consultando = true;
  try {
    await solicitar("consultar"); $("conexion").textContent = "Conectado.";
  } catch (error) {
    mensaje("No se pudo actualizar: "+error.message+". Reintentando…");
  } finally { consultando = false; }
}
function descargar() {
  const acciones = mediciones.filter(m => m.accion !== "consultar");
  const promedio = acciones.length
    ? acciones.reduce((s,m) => s+m.duracion_ms,0)/acciones.length : null;
  const reporte = {
    generado_en:new Date().toISOString(),sala:codigoSala,
    alcance:"Tiempos de peticiones desde este navegador",
    tiempo_promedio_acciones_ms:promedio === null?null:Number(promedio.toFixed(2)),
    nota:"Una acción rechazada puede ser el resultado esperado de una prueba. Este registro no calcula el porcentaje de casos de prueba exitosos.",
    mediciones
  };
  reporte.registros_importados = registrosImportados;
  reporte.casos = resultadosCasos;
  reporte.version = 2;
  const url = URL.createObjectURL(new Blob([JSON.stringify(reporte,null,2)],{type:"application/json"}));
  const enlace = document.createElement("a");
  enlace.href = url; enlace.download = "duelo-"+(codigoSala||"registro")+"-tiempos.json";
  enlace.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
}

// Panel local: no confundir rechazos de acciones con casos fallidos.
const CASOS = [
  ["CP01","Crear sala con sobrenombre válido","crear"],
  ["CP02","Rechazar sobrenombre vacío","crear"],
  ["CP03","Ingresar con código válido","ingresar"],
  ["CP04","Rechazar código incorrecto","ingresar"],
  ["CP05","Rechazar sobrenombre ocupado","ingresar"],
  ["CP06","Impedir inicio con menos de 3 jugadores","iniciar"],
  ["CP07","Iniciar con 3 jugadores y mostrar consigna","iniciar"],
  ["CP08","Rechazar canción ocupada y explicar el motivo","seleccionar"],
  ["CP09","Abrir votación cuando todos enviaron canción","votar"],
  ["CP10","Impedir voto propio y duplicado, con explicación","votar"],
  ["CP11","Cerrar antes del límite cuando todos votan","votar"],
  ["CP12","Cerrar al vencer el plazo y rechazar votos tardíos","votar"],
  ["CP13","Mostrar resultados 5 segundos y avanzar","avanzar"],
  ["CP14","Verificar puntajes y empates tras 3 rondas","ranking"]
];
function guardarPanel() {
  try {
    // Mantener el último historial sin crecer indefinidamente.
    if (mediciones.length > 10000) mediciones.splice(0, mediciones.length - 10000);
    sessionStorage.setItem("duelo-mediciones-v2",JSON.stringify(mediciones));
    sessionStorage.setItem("duelo-importados-v2",JSON.stringify(registrosImportados));
    sessionStorage.setItem("duelo-casos-v2",JSON.stringify(resultadosCasos));
  } catch { /* La visualización sigue disponible aunque se agote el almacenamiento. */ }
}
function abrirPanel() {
  $("panel-calidad").hidden = false;
  $("abrir-panel").setAttribute("aria-expanded","true");
  actualizarPanel();
  $("panel-calidad").scrollIntoView({behavior:"smooth",block:"start"});
}
function registrosDelPanel() {
  const unicos = new Map();
  for (const registro of [...mediciones,...registrosImportados]) {
    if (!registro || typeof registro.accion !== "string" ||
      typeof registro.duracion_ms !== "number" ||
      !Number.isFinite(registro.duracion_ms) || registro.duracion_ms < 0 ||
      typeof registro.fecha !== "string") continue;
    const clave = JSON.stringify([registro.fecha,registro.accion,registro.duracion_ms]);
    if (!unicos.has(clave)) unicos.set(clave,registro);
  }
  return [...unicos.values()].filter(r => r.accion !== "consultar");
}
function estadisticasTiempos(registros) {
  return {
    cantidad:registros.length,
    promedio:registros.length ? registros.reduce((s,r) => s+r.duracion_ms,0)/registros.length : null,
    aceptadas:registros.filter(r => r.aceptada === true).length,
    rechazadas:registros.filter(r => r.aceptada === false).length
  };
}
function resumenCasos() {
  const ejecutados = CASOS.filter(([id]) => ["aprobada","fallida"].includes(resultadosCasos[id]?.estado));
  const aprobados = ejecutados.filter(([id]) => resultadosCasos[id].estado === "aprobada").length;
  return {
    ejecutados:ejecutados.length,
    pendientes:CASOS.length-ejecutados.length,
    exito:ejecutados.length ? aprobados/ejecutados.length*100 : null,
    error:ejecutados.length ? (ejecutados.length-aprobados)/ejecutados.length*100 : null,
    cobertura:new Set(ejecutados.map(c => c[2])).size/7*100
  };
}
const formatoMs = n => n === null ? "Sin datos" : n.toLocaleString("es",{maximumFractionDigits:1})+" ms";
const formatoPorcentaje = n => n === null ? "Sin evaluar" : n.toFixed(1)+" %";
function metrica(titulo,valor) {
  const tarjeta = elemento("div",undefined,"metrica");
  tarjeta.append(elemento("span",titulo),elemento("strong",String(valor)));
  return tarjeta;
}
function tabla(encabezados,filas) {
  const contenedor = elemento("div",undefined,"tabla-scroll");
  const t = elemento("table");
  const cabeza = elemento("thead"), fila = elemento("tr");
  for (const titulo of encabezados) {
    const th = elemento("th",titulo); th.scope = "col"; fila.append(th);
  }
  cabeza.append(fila); const cuerpo = elemento("tbody");
  for (const valores of filas) {
    const tr = elemento("tr");
    for (const valor of valores) tr.append(elemento("td",String(valor)));
    cuerpo.append(tr);
  }
  t.append(cabeza,cuerpo); contenedor.append(t); return contenedor;
}
function actualizarPanel() {
  if ($("panel-calidad").hidden) return;
  const registros = registrosDelPanel(), stats = estadisticasTiempos(registros);
  const contenido = $("resumen-tiempos"); contenido.replaceChildren();
  const tarjetas = elemento("div",undefined,"metricas");
  tarjetas.append(metrica("Acciones medidas",stats.cantidad),
    metrica("Respuesta promedio",formatoMs(stats.promedio)),
    metrica("Aceptadas por el servidor",stats.aceptadas),
    metrica("Rechazadas o con error",stats.rechazadas));
  contenido.append(tarjetas,elemento("p","Tiempos de ida y vuelta medidos desde cada navegador. Se excluyen las consultas automáticas. Las esperas de votación no son latencia; los registros importados pueden pertenecer a varias partidas."));
  const porJugador = new Map(), porAccion = new Map();
  for (const r of registros) {
    const jugador = r.jugador || r.fuente || "Este navegador";
    const grupo = porJugador.get(jugador) || []; grupo.push(r); porJugador.set(jugador,grupo);
    const acciones = porAccion.get(r.accion) || []; acciones.push(r); porAccion.set(r.accion,acciones);
  }
  contenido.append(elemento("h3","Tiempos por jugador / registro"));
  if (!registros.length) contenido.append(elemento("p","Todavía no hay acciones medidas. Juega o importa los JSON de la prueba anterior."));
  else {
    contenido.append(tabla(["Jugador / registro","Acciones","Promedio","Aceptadas","Rechazadas / error"],
      [...porJugador].map(([nombre,filas]) => {
        const s = estadisticasTiempos(filas);
        return [nombre,s.cantidad,formatoMs(s.promedio),s.aceptadas,s.rechazadas];
      })));
    contenido.append(elemento("h3","Respuesta promedio por acción"));
    const valores = [...porAccion].map(([accion,filas]) => [accion,estadisticasTiempos(filas)]);
    const maximo = Math.max(1,...valores.map(([,s]) => s.promedio));
    for (const [accion,s] of valores) {
      const fila = elemento("div",undefined,"barra-metrica");
      fila.append(elemento("span",accion+" · "+formatoMs(s.promedio)+" · n="+s.cantidad));
      const pista = elemento("div",undefined,"barra-pista"), barra = elemento("div",undefined,"barra-valor");
      barra.style.width = Math.max(1,s.promedio/maximo*100)+"%"; pista.append(barra); fila.append(pista); contenido.append(fila);
    }
    contenido.append(elemento("h3","Últimas 20 acciones"),tabla(["Hora","Jugador / registro","Acción","Tiempo","Respuesta"],
      registros.slice(-20).reverse().map(r => [r.fecha,r.jugador||r.fuente||"Este navegador",r.accion,
        formatoMs(r.duracion_ms),r.aceptada===true?"Aceptada":r.detalle||"Rechazada / error"])));
  }
  const casos = resumenCasos(), resumen = $("resumen-casos"); resumen.replaceChildren();
  const cifras = elemento("div",undefined,"metricas");
  cifras.append(metrica("Casos ejecutados",casos.ejecutados+" / "+CASOS.length),
    metrica("Pruebas exitosas",formatoPorcentaje(casos.exito)),
    metrica("Tasa de error de pruebas",formatoPorcentaje(casos.error)),
    metrica("Cobertura de 7 funciones",formatoPorcentaje(casos.cobertura)));
  resumen.append(cifras,elemento("p",casos.pendientes+" casos pendientes. Resultados registrados manualmente; no es un reporte de ejecución automática de Playwright."));
}
function prepararCasos() {
  for (const [id,titulo] of CASOS) {
    const fila = elemento("div",undefined,"caso-prueba");
    const label = elemento("label",id+" · "+titulo); label.htmlFor = "caso-"+id;
    const selector = elemento("select"); selector.id = "caso-"+id;
    for (const [valor,texto] of [["pendiente","Pendiente"],["aprobada","Aprobada"],["fallida","Fallida"]]) {
      const opcion = elemento("option",texto); opcion.value = valor; selector.append(opcion);
    }
    selector.value = resultadosCasos[id]?.estado || "pendiente";
    const notas = elemento("input"); notas.placeholder = "Observación o nombre de la evidencia";
    notas.setAttribute("aria-label","Evidencia y observación de "+id);
    notas.value = resultadosCasos[id]?.nota || "";
    const guardar = () => {
      resultadosCasos[id] = {estado:selector.value,nota:notas.value}; guardarPanel(); actualizarPanel();
    };
    selector.addEventListener("change",guardar); notas.addEventListener("input",guardar);
    fila.append(label,selector,notas); $("casos-prueba").append(fila);
  }
}
$("abrir-panel").addEventListener("click",() => {
  if ($("panel-calidad").hidden) abrirPanel();
  else { $("panel-calidad").hidden = true; $("abrir-panel").setAttribute("aria-expanded","false"); }
});
$("exportar-panel").addEventListener("click",descargar);
$("imprimir-panel").addEventListener("click",() => window.print());
$("importar-registros").addEventListener("change",async evento => {
  let agregados = 0; const errores = [];
  for (const archivo of evento.target.files) {
    try {
      if (archivo.size > 5000000) throw new Error("el archivo supera 5 MB");
      const reporte = JSON.parse(await archivo.text());
      if (!Array.isArray(reporte.mediciones)) throw new Error("no contiene mediciones del demo");
      const fuente = archivo.name.replace(/\.json$/i,"");
      const entrada = [...reporte.mediciones,...(Array.isArray(reporte.registros_importados)?reporte.registros_importados:[])];
      const validos = entrada.filter(r => r && typeof r.accion === "string" &&
        typeof r.fecha === "string" && typeof r.duracion_ms === "number" &&
        Number.isFinite(r.duracion_ms) && r.duracion_ms >= 0 && typeof r.aceptada === "boolean");
      if (!validos.length) throw new Error("no contiene mediciones válidas");
      if (registrosImportados.length+validos.length > 20000) throw new Error("límite de registros importados alcanzado");
      for (const r of validos) {
        const duplicado = [...mediciones,...registrosImportados].some(m => m.fecha === r.fecha && m.accion === r.accion && m.duracion_ms === r.duracion_ms);
        if (!duplicado) { registrosImportados.push({...r,fuente:r.fuente||fuente}); agregados++; }
      }
    } catch (error) { errores.push(archivo.name+": "+error.message); }
  }
  guardarPanel(); actualizarPanel(); evento.target.value = "";
  $("importacion-estado").textContent = agregados+" mediciones agregadas; se omitieron duplicados. "+errores.join(" · ");
});
prepararCasos();
$("crear").addEventListener("click",() => ejecutar("crear",{nombre:$("sobrenombre").value.trim()}));
$("unirse").addEventListener("click",() => ejecutar("unirse",{
  codigo:$("codigo").value.trim().toUpperCase(),nombre:$("sobrenombre").value.trim()
}));
$("iniciar").addEventListener("click",() => ejecutar("iniciar"));
$("salir").addEventListener("click",() => ejecutar("salir"));
const invitada = new URLSearchParams(location.search).get("sala");
if (invitada && /^[A-Za-z0-9]{6}$/.test(invitada)) $("codigo").value = invitada.toUpperCase();

async function conectar() {
  try {
    $("conexion").textContent = "Conectando…";
    const {data,error} = await db.auth.getSession();
    if (error) throw error;
    if (!data.session) {
      const resultado = await db.auth.signInAnonymously();
      if (resultado.error) throw resultado.error;
    }
    listo = true; $("conexion").textContent = "Conectado. ¡Arma tu duelo!";
    actualizarBotones();
    const guardada = sessionStorage.getItem("duelo-sala");
    if (guardada) {
      codigoSala = guardada;
      try { await solicitar("consultar"); }
      catch {
        codigoSala = ""; sessionStorage.removeItem("duelo-sala");
        mensaje("No se pudo recuperar la sala. Puedes ingresar nuevamente.");
      }
    }
    setInterval(consultar,1000); setInterval(dibujarTiempo,100);
    document.addEventListener("visibilitychange",() => { if (!document.hidden) consultar(); });
  } catch (error) {
    $("conexion").textContent = "No se pudo conectar.";
    mensaje(error.message+" Revisa la conexión y Allow anonymous sign-ins en Supabase.");
  }
}
conectar();

