import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const db = createClient(
  "https://wjzodrfdcbizvmpqjdrz.supabase.co",
  "sb_publishable_SvYab-gXlEgKJni4WIuyfQ_CCaflZaV"
);
const $ = id => document.getElementById(id);
const CANCIONES = [
  {
    "id": "c01",
    "titulo": "Only Whispering",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d2/Josh_Woodward_-_Only_Whispering_-_01_-_Only_Whispering.ogg/Josh_Woodward_-_Only_Whispering_-_01_-_Only_Whispering.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Josh_Woodward_-_Only_Whispering_-_01_-_Only_Whispering.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_01_-_Only_Whispering.ogg"
  },
  {
    "id": "c02",
    "titulo": "Adventures Of The Deaf Dreamer",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/40/Josh_Woodward_-_Only_Whispering_-_02_-_Adventures_Of_The_Deaf_Dreamer.ogg/Josh_Woodward_-_Only_Whispering_-_02_-_Adventures_Of_The_Deaf_Dreamer.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/4/40/Josh_Woodward_-_Only_Whispering_-_02_-_Adventures_Of_The_Deaf_Dreamer.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_02_-_Adventures_Of_The_Deaf_Dreamer.ogg"
  },
  {
    "id": "c03",
    "titulo": "I'll Be Right Behind You, Josephine",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4b/Josh_Woodward_-_Only_Whispering_-_03_-_I%27ll_Be_Right_Behind_You%2C_Josephine.ogg/Josh_Woodward_-_Only_Whispering_-_03_-_I%27ll_Be_Right_Behind_You%2C_Josephine.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Josh_Woodward_-_Only_Whispering_-_03_-_I%27ll_Be_Right_Behind_You%2C_Josephine.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_03_-_I%27ll_Be_Right_Behind_You%2C_Josephine.ogg"
  },
  {
    "id": "c04",
    "titulo": "Postcard From Hell",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/10/Josh_Woodward_-_Only_Whispering_-_04_-_Postcard_From_Hell.ogg/Josh_Woodward_-_Only_Whispering_-_04_-_Postcard_From_Hell.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/1/10/Josh_Woodward_-_Only_Whispering_-_04_-_Postcard_From_Hell.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_04_-_Postcard_From_Hell.ogg"
  },
  {
    "id": "c05",
    "titulo": "To Lose The War",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/53/Josh_Woodward_-_Only_Whispering_-_05_-_To_Lose_The_War.ogg/Josh_Woodward_-_Only_Whispering_-_05_-_To_Lose_The_War.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/5/53/Josh_Woodward_-_Only_Whispering_-_05_-_To_Lose_The_War.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_05_-_To_Lose_The_War.ogg"
  },
  {
    "id": "c06",
    "titulo": "Sugar On My Tongue",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/05/Josh_Woodward_-_Only_Whispering_-_06_-_Sugar_On_My_Tongue.ogg/Josh_Woodward_-_Only_Whispering_-_06_-_Sugar_On_My_Tongue.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/0/05/Josh_Woodward_-_Only_Whispering_-_06_-_Sugar_On_My_Tongue.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_06_-_Sugar_On_My_Tongue.ogg"
  },
  {
    "id": "c07",
    "titulo": "Cardinal Brigade",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a3/Josh_Woodward_-_Only_Whispering_-_07_-_Cardinal_Brigade.ogg/Josh_Woodward_-_Only_Whispering_-_07_-_Cardinal_Brigade.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Josh_Woodward_-_Only_Whispering_-_07_-_Cardinal_Brigade.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_07_-_Cardinal_Brigade.ogg"
  },
  {
    "id": "c08",
    "titulo": "East Side Bar",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/9f/Josh_Woodward_-_Only_Whispering_-_08_-_East_Side_Bar.ogg/Josh_Woodward_-_Only_Whispering_-_08_-_East_Side_Bar.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Josh_Woodward_-_Only_Whispering_-_08_-_East_Side_Bar.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_08_-_East_Side_Bar.ogg"
  },
  {
    "id": "c09",
    "titulo": "Fool's Gold",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/52/Josh_Woodward_-_Only_Whispering_-_09_-_Fool%27s_Gold.ogg/Josh_Woodward_-_Only_Whispering_-_09_-_Fool%27s_Gold.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/5/52/Josh_Woodward_-_Only_Whispering_-_09_-_Fool%27s_Gold.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_09_-_Fool%27s_Gold.ogg"
  },
  {
    "id": "c10",
    "titulo": "Fit For A King",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f8/Josh_Woodward_-_Only_Whispering_-_10_-_Fit_For_A_King.ogg/Josh_Woodward_-_Only_Whispering_-_10_-_Fit_For_A_King.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/f/f8/Josh_Woodward_-_Only_Whispering_-_10_-_Fit_For_A_King.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_10_-_Fit_For_A_King.ogg"
  },
  {
    "id": "c11",
    "titulo": "Goodbye To Spring",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f6/Josh_Woodward_-_Only_Whispering_-_11_-_Goodbye_To_Spring.ogg/Josh_Woodward_-_Only_Whispering_-_11_-_Goodbye_To_Spring.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Josh_Woodward_-_Only_Whispering_-_11_-_Goodbye_To_Spring.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_Only_Whispering_-_11_-_Goodbye_To_Spring.ogg"
  },
  {
    "id": "c12",
    "titulo": "I'm Letting Go",
    "artista": "Josh Woodward",
    "audio": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/05/Josh_Woodward_-_The_Simple_Life%2C_Part_1_-_07_-_Im_Letting_Go.ogg/Josh_Woodward_-_The_Simple_Life%2C_Part_1_-_07_-_Im_Letting_Go.ogg.mp3",
    "alternativo": "https://upload.wikimedia.org/wikipedia/commons/0/05/Josh_Woodward_-_The_Simple_Life%2C_Part_1_-_07_-_Im_Letting_Go.ogg",
    "fuente": "https://commons.wikimedia.org/wiki/File:Josh_Woodward_-_The_Simple_Life%2C_Part_1_-_07_-_Im_Letting_Go.ogg"
  }
];
const CONSIGNAS = [
  "Una canción para animar una fiesta",
  "Una canción para una escena divertida",
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
let musicaClave = "";
const celebradas = new Set();

function limpiarFinal() {
  detenerAudio(); siguienteAudio = null;
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
  const temas = ganadores.map(p => ({p,propuesta:estado.propuestas.find(o=>o.autor===p.nombre)})).filter(t=>t.propuesta);
  const clave = estado.codigo+":"+temas.map(t=>t.propuesta.cancion_id).join(",");
  if (musicaClave === clave) return;
  limpiarFinal(); musicaClave = clave;
  if (!temas.length) return;
  const panel = $("musica-final"); panel.hidden = false;
  panel.append(elemento("p","EL ENCORE DEL DUELO","categoria"),elemento("h2",temas.length>1?"El sonido de los ganadores":"El sonido del ganador"),
    elemento("p","La elección de la última ronda. Suena automáticamente en cada dispositivo."));
  for (const {p,propuesta} of temas) panel.append(elemento("p",cancion(propuesta.cancion_id).titulo+" · "+p.nombre));
  panel.append(elemento("p","Preparando música…","estado-audio"),boton("Silenciar / activar sonido",() => { audio.muted = !audio.muted; }));
  const cola = temas.map(t=>t.propuesta.cancion_id);
  let indice = 0;
  siguienteAudio = () => { indice++; if (indice < cola.length) reproducir(cola[indice],false); };
  reproducir(cola[0],false);

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
  if (["elegir","votar"].includes(accion)) cerrarEscucha();
  ocupado = true; actualizarBotones(); mensaje();
  try {
    while (consultando) await new Promise(r => setTimeout(r,40));
    const respuesta = await solicitar(accion,opciones);
    if (respuesta.salio) {
      cerrarEscucha(); limpiarFinal();
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
  if (estado && (estado.estado !== datos.estado || estado.ronda !== datos.ronda || estado.codigo !== datos.codigo)) cerrarEscucha();
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
              boton(ocupada ? "Canción ya seleccionada" : "Elegir",() => abrirEscucha(tema,"elegir",tema.id,rondaVisible),ocupado || ocupada, ocupada ? motivo : ""));
            tarjeta.tabIndex = 0;
            tarjeta.setAttribute("role","group");
            tarjeta.setAttribute("aria-label",tema.titulo+" — toca para escuchar");
            tarjeta.addEventListener("click",evento => { if (!evento.target.closest("button")) abrirEscucha(tema,"elegir",tema.id,rondaVisible,ocupada ? motivo : ""); });
            tarjeta.addEventListener("keydown",evento => { if (evento.target === tarjeta && ["Enter"," "].includes(evento.key)) { evento.preventDefault(); abrirEscucha(tema,"elegir",tema.id,rondaVisible,ocupada ? motivo : ""); } });
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
        tarjeta.append(boton("Escuchar canción",() => abrirEscucha(tema,"votar",propuesta.id,rondaVisible,motivo)));
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
    if ($("escucha").open) cerrarEscucha();
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


// One audio element: previews and the final song can never overlap.
const audio = new Audio(); audio.preload = "none"; audio.volume = .65;
let limiteAudio = null, siguienteAudio = null, audioPendiente = false, intentoAudio = 0;
let inicioFragmento = 0, temaActual = null, usandoAlternativo = false;
function estadoAudio(texto) {
  const destino = $("escucha").open ? $("escucha-estado") : $("musica-final").querySelector(".estado-audio");
  if (destino) destino.textContent = texto;
}
function detenerAudio() {
  intentoAudio++; audioPendiente = false; audio.pause(); audio.removeAttribute("src"); audio.load(); limiteAudio = null; temaActual = null; usandoAlternativo = false; inicioFragmento = 0;
}
function intentarAudio() {
  const intento = ++intentoAudio;
  audio.play().then(() => { if (intento !== intentoAudio) return; audioPendiente = false; estadoAudio("♫ Sonando"+(limiteAudio ? " · fragmento de 20 segundos" : "")); }).catch(error => {
    if (intento !== intentoAudio || error.name === "AbortError") return;
    audioPendiente = error.name === "NotAllowedError";
    estadoAudio(audioPendiente ? "Tu navegador bloqueó el audio. Toca cualquier parte del juego para habilitarlo." : "No se pudo cargar la música. Revisa tu conexión; puedes continuar jugando.");
  });
}
function reproducir(id,fragmento=true) {
  detenerAudio(); limiteAudio = fragmento ? 20 : null;
  inicioFragmento = fragmento ? 30 : 0; temaActual = cancion(id);
  audio.src = temaActual.audio;
  estadoAudio("Cargando canción…"); intentarAudio();
}
audio.addEventListener("loadedmetadata",() => {
  if (limiteAudio && inicioFragmento && Number.isFinite(audio.duration)) {
    inicioFragmento = Math.min(inicioFragmento,Math.max(0,audio.duration-limiteAudio));
    audio.currentTime = inicioFragmento;
  }
});
audio.addEventListener("timeupdate",() => {
  if (limiteAudio && audio.currentTime >= inicioFragmento + limiteAudio) { audio.pause(); estadoAudio("Fragmento terminado. Confirma tu selección o prueba otra canción."); }
});
audio.addEventListener("ended",() => { if (!limiteAudio && siguienteAudio) siguienteAudio(); });
audio.addEventListener("error",() => {
  if (!audio.getAttribute("src") || !temaActual) return;
  if (!usandoAlternativo && temaActual.alternativo) {
    usandoAlternativo = true; audio.src = temaActual.alternativo; intentarAudio(); return;
  }
  estadoAudio("No se pudo cargar la canción. Revisa tu conexión; puedes continuar jugando.");
});
let audioPreparado = false;
function gestoAudio() {
  if (audioPendiente) { intentarAudio(); return; }
  if (audioPreparado) return;
  audioPreparado = true;
  if (audio.getAttribute("src")) return;
  const intento = ++intentoAudio;
  audio.src = "data:audio/wav;base64,UklGRnQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==";
  audio.play().then(() => {
    if (intento !== intentoAudio) return;
    audio.pause(); audio.removeAttribute("src"); audio.load();
  }).catch(() => { if (intento === intentoAudio) audioPreparado = false; });
}
document.addEventListener("pointerdown",gestoAudio,true);
document.addEventListener("keydown",gestoAudio,true);
function cerrarEscucha() {
  if ($("escucha").open) { $("escucha").close(); detenerAudio(); }
}
function abrirEscucha(tema,accion,valor,ronda,motivo="") {
  if (!estado || estado.ronda !== ronda || !["seleccion","votacion"].includes(estado.estado)) return;
  if (estado.estado === "votacion" && plazoLocal !== null && performance.now() >= plazoLocal) return;
  $("escucha-titulo").textContent = tema.titulo;
  $("escucha-artista").textContent = tema.artista;
  $("escucha-regla").textContent = motivo || (accion === "elegir" ? "Escuchar no confirma tu elección. Al elegirla, la música se detiene. No podrás cambiarla." : "El cronómetro de votación sigue corriendo mientras escuchas.");
  const acciones = $("escucha-acciones"); acciones.replaceChildren();
  acciones.append(boton(accion === "elegir" ? "Elegir" : "Votar por esta canción",() => {
    if (!estado || estado.ronda !== ronda || estado.estado !== (accion === "elegir" ? "seleccion" : "votacion")) { cerrarEscucha(); return; }
    cerrarEscucha(); ejecutar(accion,{valor,ronda});
  },ocupado || !!motivo,motivo));
  if (!$("escucha").open) $("escucha").showModal();
  reproducir(tema.id);
}
$("cerrar-escucha").addEventListener("click",cerrarEscucha);
$("escucha").addEventListener("cancel",cerrarEscucha);
$("escucha").addEventListener("close",() => { if (estado?.estado !== "finalizada") detenerAudio(); });

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
