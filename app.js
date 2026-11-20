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
const mediciones = [];
const mensaje = (texto = "") => { $("mensaje").textContent = texto; };
const cancion = id => CANCIONES.find(c => c.id === id) || {titulo:"Canción desconocida",artista:""};

function elemento(tag, texto, clase) {
  const nodo = document.createElement(tag);
  if (texto !== undefined) nodo.textContent = texto;
  if (clase) nodo.className = clase;
  return nodo;
}
function boton(texto, accion, desactivado = false) {
  const nodo = elemento("button", texto);
  nodo.type = "button"; nodo.disabled = desactivado;
  nodo.addEventListener("click", accion);
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
  let correcta = false;
  try {
    const {data,error} = await db.rpc("duelo", {
      p_accion:accion,p_codigo:codigo,p_nombre:nombre,
      p_valor:valor,p_ronda:ronda
    });
    if (error) throw error;
    if (!data) throw new Error("El servidor no devolvió datos.");
    if (data.codigo) aplicarEstado(data);
    if (data.error) throw new Error(data.error);
    correcta = true;
    return data;
  } finally {
    mediciones.push({
      fecha:new Date().toISOString(),accion,aceptada:correcta,
      duracion_ms:Number((performance.now()-inicio).toFixed(2))
    });
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
    yaVote:estado.ya_vote,propuestas:estado.propuestas
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
            tarjeta.append(elemento("strong",tema.titulo),elemento("p",tema.artista),
              boton("Elegir canción",() => {
                if (confirm('¿Enviar "'+tema.titulo+'"? No podrás cambiarla.'))
                  ejecutar("elegir",{valor:tema.id,ronda:rondaVisible});
              },ocupado));
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
        tarjeta.append(elemento("strong",tema.titulo),elemento("p",tema.artista),
          boton(propuesta.mia?"Tu canción":estado.ya_vote?"Voto ya registrado":"Votar",() => {
            if (confirm('¿Confirmar voto por "'+tema.titulo+'"?'))
              ejecutar("votar",{valor:propuesta.id,ronda:rondaVisible});
          },ocupado || propuesta.mia || estado.ya_vote));
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
      contenido.append(boton("Descargar registro de tiempos",descargar));
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
  if (estado.estado === "votacion" && segundos === 0)
    for (const control of $("contenido").querySelectorAll("button")) control.disabled = true;
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
  const url = URL.createObjectURL(new Blob([JSON.stringify(reporte,null,2)],{type:"application/json"}));
  const enlace = document.createElement("a");
  enlace.href = url; enlace.download = "duelo-"+(codigoSala||"registro")+"-tiempos.json";
  enlace.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
}
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
