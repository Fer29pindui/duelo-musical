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
const cancionesOcupadas = new Set();
let turnoOcupadas = "";
const VIDEOS = {c01:"YXnjy5YlDwk",c02:"7zp1TbLFPp8",c03:"JRfuAukYTKg",c04:"HgzGwKwLmgM",c05:"t8pjh1URlXs",c06:"VPRjCeoBqrI",c07:"4NRXx6U8ABQ",c08:"gGdGFtwCNBE",c09:"aZx5zfkG6oU",c10:"IcrbM1l_BoI",c11:"VBiNZcH27Y8",c12:"hReAuaAuJOE"};
let musicaClave = "";
const celebradas = new Set();

function limpiarFinal() {
  $("musica-final").replaceChildren(); $("musica-final").hidden = true;
  musicaClave = "";
}
function celebrar(ganadores) {
  if (!ganadores.some(p => p.soy_yo) || celebradas.has(estado.codigo)) return;
  celebradas.add(estado.codigo);
  const clave = "duelo-celebrado:" + estado.codigo;
  if (sessionStorage.getItem(clave)) return;
  sessionStorage.setItem(clave,"1");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const capa = elemento("div",undefined,"confeti");
  capa.setAttribute("aria-hidden","true");
  for (let i = 0; i < 70; i++) {
    const papel = elemento("i");
    papel.style.cssText = `left:${Math.random()*100}%;background:${["#1ed760","#f3ca65","#faf5dc"][i%3]};animation-delay:${Math.random()*1.5}s;--giro:${Math.random()*720}deg`;
    capa.append(papel);
  }
  document.body.append(capa); setTimeout(() => capa.remove(),6500);
}
function mostrarFinal(contenido) {
  const jugadores = [...estado.participantes].sort((a,b) => b.puntos-a.puntos || a.nombre.localeCompare(b.nombre,"es"));
  const puesto = p => 1 + jugadores.filter(o => o.puntos > p.puntos).length;
  const ganadores = jugadores.filter(p => p.puntos > 0 && puesto(p) === 1);
  contenido.append(elemento("h3",!ganadores.length ? "Sin votos registrados" : ganadores.length > 1 ? "🏆 Primer puesto compartido" : "🏆 El soundtrack ganador"));
  contenido.append(elemento("p",ganadores.map(p=>p.nombre).join(" · "),"nombres-ganadores"));
  const podio = elemento("div",undefined,"podio");
  podio.setAttribute("aria-label","Podio de resultados");
  for (const indice of [1,0,2]) {
    const p = jugadores[indice]; if (!p) continue;
    const bloque = elemento("div",undefined,"escalon escalon-"+indice+(p.soy_yo?" eres-tu":""));
    bloque.append(elemento("span",puesto(p)===1 && p.puntos>0 ? "♛" : "♫","corona"),
      elemento("span",p.nombre.slice(0,2).toLocaleUpperCase(),"avatar-podio"),
      elemento("strong",p.nombre+(p.soy_yo?" (tú)":"")),
      elemento("span",p.puntos+" puntos","puntos-podio"),elemento("span",String(puesto(p)),"numero-podio"));
    podio.append(bloque);
  }
  contenido.append(podio);
  const tabla = elemento("ol",undefined,"ranking"); tabla.setAttribute("aria-label","Clasificación completa");
  for (const p of jugadores) {
    const fila = elemento("li",undefined,p.soy_yo?"fila-tu":"");
    fila.append(elemento("span",puesto(p)+"º","posicion"),elemento("strong",p.nombre+(p.soy_yo?" (tú)":"")),elemento("span",p.puntos+" pts","puntos-ranking"));
    tabla.append(fila);
  }
  contenido.append(tabla);
  if (ganadores.length > 1) contenido.append(elemento("p","Los empates comparten puesto.","nota"));
  celebrar(ganadores);
  const temas = ganadores.map(p => ({p,propuesta:estado.propuestas.find(o=>o.autor===p.nombre)})).filter(t=>t.propuesta && VIDEOS[t.propuesta.cancion_id]);
  const clave = estado.codigo+":"+temas.map(t=>t.propuesta.cancion_id).join(",");
  if (musicaClave === clave) return;
  limpiarFinal(); musicaClave = clave;
  if (!temas.length) return;
  const panel = $("musica-final"); panel.hidden = false;
  panel.append(elemento("p","EL ENCORE DEL DUELO","categoria"),elemento("h2",temas.length>1?"Las canciones de los ganadores":"La canción del ganador"),
    elemento("p","La elección de la última ronda. Disponible para todos los participantes."));
  temas.forEach(({p,propuesta},i) => {
    const tema = cancion(propuesta.cancion_id), video = VIDEOS[tema.id];
    panel.append(elemento("h3",tema.titulo+" — "+tema.artista),elemento("p","Elegida por "+p.nombre,"nota"));
    const reproductor = elemento("iframe",undefined,"reproductor-final");
    reproductor.title = tema.titulo+" — reproductor de YouTube";
    reproductor.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    reproductor.referrerPolicy = "strict-origin-when-cross-origin";
    reproductor.src = "https://www.youtube-nocookie.com/embed/"+video+"?autoplay="+(i===0?1:0)+"&playsinline=1&rel=0";
    reproductor.setAttribute("allowfullscreen","");
    panel.append(reproductor);
    const enlace = elemento("a","Abrir en YouTube"); enlace.href = "https://www.youtube.com/watch?v="+video; enlace.target = "_blank"; enlace.rel = "noopener noreferrer";
    panel.append(enlace);
  });
  panel.append(elemento("p","Si no suena automáticamente, toca ▶ en el reproductor. Puedes ajustar el volumen o pausar. En un empate, reproduce las demás canciones cuando quieras.","nota"));
}
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
  return data;
}
async function ejecutar(accion, opciones = {}) {
  if (ocupado) return;
  ocupado = true; actualizarBotones(); mensaje();
  try {
    while (consultando) await new Promise(r => setTimeout(r,40));
    const respuesta = await solicitar(accion,opciones);
    if (respuesta.salio) {
      limpiarFinal();
      document.querySelector(".confeti")?.remove();
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
  if (estado.estado !== "finalizada" && musicaClave) limpiarFinal();
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
    jugadores:estado.estado === "finalizada" ? estado.participantes : null,
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
      mostrarFinal(contenido);
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
