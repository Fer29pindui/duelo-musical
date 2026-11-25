import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const db = createClient(
  "https://wjzodrfdcbizvmpqjdrz.supabase.co",
  "sb_publishable_SvYab-gXlEgKJni4WIuyfQ_CCaflZaV"
);
const $ = id => document.getElementById(id);
const CANCIONES = [
  {
    "id": "c01",
    "titulo": "Vivir mi vida",
    "artista": "Marc Anthony",
    "video": "YXnjy5YlDwk",
    "pista": "voy a reir voy a bailar",
    "claves": "salsa fiesta alegria"
  },
  {
    "id": "c02",
    "titulo": "Danza Kuduro",
    "artista": "Don Omar, Lucenzo",
    "video": "7zp1TbLFPp8",
    "pista": "la mano arriba cintura sola",
    "claves": "danza sacuduro dan sacuduro tan sacuduro kuduro danza reggaeton fiesta"
  },
  {
    "id": "c03",
    "titulo": "Titanium",
    "artista": "David Guetta, Sia",
    "video": "JRfuAukYTKg",
    "pista": "you shoot me down",
    "claves": "electronica fuerza motivacion"
  },
  {
    "id": "c04",
    "titulo": "Don’t Stop Me Now",
    "artista": "Queen",
    "video": "HgzGwKwLmgM",
    "pista": "having a good time",
    "claves": "rock fiesta energia"
  },
  {
    "id": "c05",
    "titulo": "La vida es un carnaval",
    "artista": "Celia Cruz",
    "video": "t8pjh1URlXs",
    "pista": "no hay que llorar",
    "claves": "salsa fiesta alegria"
  },
  {
    "id": "c06",
    "titulo": "A Sky Full of Stars",
    "artista": "Coldplay",
    "video": "VPRjCeoBqrI",
    "pista": "you are a sky",
    "claves": "estrellas viaje pop"
  },
  {
    "id": "c07",
    "titulo": "Blinding Lights",
    "artista": "The Weeknd",
    "video": "4NRXx6U8ABQ",
    "pista": "blinded by the lights",
    "claves": "ochentas noche carretera pop"
  },
  {
    "id": "c08",
    "titulo": "Mr. Brightside",
    "artista": "The Killers",
    "video": "gGdGFtwCNBE",
    "pista": "coming out of my cage",
    "claves": "rock celos fiesta"
  },
  {
    "id": "c09",
    "titulo": "Me rehúso",
    "artista": "Danny Ocean",
    "video": "LbKcHy9cav0",
    "pista": "para que no me olvides",
    "claves": "reggaeton amor despedida"
  },
  {
    "id": "c10",
    "titulo": "Wake Me Up",
    "artista": "Avicii",
    "video": "IcrbM1l_BoI",
    "pista": "when it is all over",
    "claves": "electronica viaje motivacion"
  },
  {
    "id": "c11",
    "titulo": "Otro atardecer",
    "artista": "Bad Bunny, The Marías",
    "video": "VBiNZcH27Y8",
    "pista": "otro atardecer",
    "claves": "playa verano viaje"
  },
  {
    "id": "c12",
    "titulo": "Lamento boliviano",
    "artista": "Enanitos Verdes",
    "video": "hReAuaAuJOE",
    "pista": "estoy aqui borracho y loco",
    "claves": "rock español amigos"
  },
  {
    "id": "c13",
    "titulo": "Despacito",
    "artista": "Luis Fonsi, Daddy Yankee",
    "video": "kJQP7kiw5Fk",
    "pista": "pasito a pasito suave suavecito",
    "claves": "reggaeton fiesta"
  },
  {
    "id": "c14",
    "titulo": "Bailando",
    "artista": "Enrique Iglesias, Descemer Bueno, Gente de Zona",
    "video": "NUsoVlDFqZg",
    "pista": "tu cuerpo y el mio",
    "claves": "fiesta baile latino"
  },
  {
    "id": "c15",
    "titulo": "Propuesta indecente",
    "artista": "Romeo Santos",
    "video": "QFs3PIZb3js",
    "pista": "una aventura es mas divertida",
    "claves": "bachata romantica baile"
  },
  {
    "id": "c16",
    "titulo": "Waka Waka",
    "artista": "Shakira",
    "video": "pRpeEdMmmQ0",
    "pista": "this time for africa",
    "claves": "mundial futbol fiesta"
  },
  {
    "id": "c17",
    "titulo": "PROVENZA",
    "artista": "KAROL G",
    "video": "ca48oMV59LU",
    "pista": "baby que mas",
    "claves": "reggaeton playa verano"
  },
  {
    "id": "c18",
    "titulo": "Tití me preguntó",
    "artista": "Bad Bunny",
    "video": "Cr8K88UcO0s",
    "pista": "si tengo muchas novias",
    "claves": "reggaeton fiesta"
  },
  {
    "id": "c19",
    "titulo": "Antología",
    "artista": "Shakira",
    "video": "pWgVRK_Ggww",
    "pista": "para amarte necesito una razon",
    "claves": "balada romantica amor"
  },
  {
    "id": "c20",
    "titulo": "Uptown Funk",
    "artista": "Mark Ronson, Bruno Mars",
    "video": "OPf0YbXqDm0",
    "pista": "dont believe me just watch",
    "claves": "funk fiesta baile"
  },
  {
    "id": "c21",
    "titulo": "Shape of You",
    "artista": "Ed Sheeran",
    "video": "JGwWNGJdvx8",
    "pista": "im in love with",
    "claves": "pop amor baile"
  },
  {
    "id": "c22",
    "titulo": "Shake It Off",
    "artista": "Taylor Swift",
    "video": "nfWlot6h_JM",
    "pista": "players gonna play",
    "claves": "pop fiesta motivacion"
  },
  {
    "id": "c23",
    "titulo": "Rolling in the Deep",
    "artista": "Adele",
    "video": "rYEDA3JcQqw",
    "pista": "we could have had it all",
    "claves": "despecho balada fuerza"
  },
  {
    "id": "c24",
    "titulo": "Happy",
    "artista": "Pharrell Williams",
    "video": "ZbZSe6N_BXs",
    "pista": "clap along",
    "claves": "felicidad alegria fiesta"
  },
  {
    "id": "c25",
    "titulo": "Firework",
    "artista": "Katy Perry",
    "video": "QGJuMBdaqIw",
    "pista": "baby youre a firework",
    "claves": "pop motivacion autoestima"
  },
  {
    "id": "c26",
    "titulo": "Roar",
    "artista": "Katy Perry",
    "video": "CevxZvSJLk8",
    "pista": "eye of the tiger",
    "claves": "pop fuerza motivacion"
  },
  {
    "id": "c27",
    "titulo": "Gangnam Style",
    "artista": "PSY",
    "video": "9bZkp7q19f0",
    "pista": "oppa gangnam style",
    "claves": "baile fiesta coreano"
  },
  {
    "id": "c28",
    "titulo": "Bohemian Rhapsody",
    "artista": "Queen",
    "video": "fJ9rUzIMcZQ",
    "pista": "is this the real life",
    "claves": "rock clasico amigos"
  },
  {
    "id": "c29",
    "titulo": "We Will Rock You",
    "artista": "Queen",
    "video": "-tJYN-eG1zk",
    "pista": "we will rock you",
    "claves": "estadio futbol rock"
  },
  {
    "id": "c30",
    "titulo": "Sweet Child O’ Mine",
    "artista": "Guns N’ Roses",
    "video": "1w7OgIMMRc4",
    "pista": "sweet child of mine",
    "claves": "rock guitarra clasico"
  },
  {
    "id": "c31",
    "titulo": "November Rain",
    "artista": "Guns N’ Roses",
    "video": "8SbUC-UaAxE",
    "pista": "nothing lasts forever",
    "claves": "rock balada lluvia"
  },
  {
    "id": "c32",
    "titulo": "Take On Me",
    "artista": "a-ha",
    "video": "djV11Xbc914",
    "pista": "take me on",
    "claves": "ochentas pop viaje"
  },
  {
    "id": "c33",
    "titulo": "Africa",
    "artista": "Toto",
    "video": "FTQbiNvZqaY",
    "pista": "rains down in africa",
    "claves": "rock viaje ochentas"
  },
  {
    "id": "c34",
    "titulo": "Never Gonna Give You Up",
    "artista": "Rick Astley",
    "video": "dQw4w9WgXcQ",
    "pista": "never gonna let you down",
    "claves": "rickroll meme ochentas"
  },
  {
    "id": "c35",
    "titulo": "Someone Like You",
    "artista": "Adele",
    "video": "hLQl3WQQoQ0",
    "pista": "never mind ill find",
    "claves": "balada despecho piano"
  },
  {
    "id": "c36",
    "titulo": "Baby",
    "artista": "Justin Bieber, Ludacris",
    "video": "kffacxfA7G4",
    "pista": "baby baby baby oh",
    "claves": "pop adolescencia nostalgia"
  },
  {
    "id": "c37",
    "titulo": "Billie Jean",
    "artista": "Michael Jackson",
    "video": "Zi_XLOBDo_Y",
    "pista": "billie jean is not my lover",
    "claves": "pop ochentas baile"
  },
  {
    "id": "c38",
    "titulo": "Thriller",
    "artista": "Michael Jackson",
    "video": "sOnqjkJTMaA",
    "pista": "thriller night",
    "claves": "halloween baile pop"
  },
  {
    "id": "c39",
    "titulo": "Smells Like Teen Spirit",
    "artista": "Nirvana",
    "video": "hTWKbfoikeg",
    "pista": "here we are now",
    "claves": "rock grunge noventas"
  },
  {
    "id": "c40",
    "titulo": "Wonderwall",
    "artista": "Oasis",
    "video": "bx1Bh8ZvH84",
    "pista": "youre gonna be the one",
    "claves": "rock amigos guitarra"
  },
  {
    "id": "c41",
    "titulo": "Yellow",
    "artista": "Coldplay",
    "video": "yKNxeF4KMsY",
    "pista": "look at the stars",
    "claves": "romantica amor amarillo"
  },
  {
    "id": "c42",
    "titulo": "Viva la Vida",
    "artista": "Coldplay",
    "video": "dvgZkm1xWPE",
    "pista": "i used to rule the world",
    "claves": "pop viaje epica"
  },
  {
    "id": "c43",
    "titulo": "Counting Stars",
    "artista": "OneRepublic",
    "video": "hT_nvWreIhg",
    "pista": "no more counting dollars",
    "claves": "pop viaje motivacion"
  },
  {
    "id": "c44",
    "titulo": "Demons",
    "artista": "Imagine Dragons",
    "video": "mWRsgZuwf_8",
    "pista": "where my demons hide",
    "claves": "rock pop tristeza"
  },
  {
    "id": "c45",
    "titulo": "Believer",
    "artista": "Imagine Dragons",
    "video": "7wtfhZwyrcc",
    "pista": "you made me a believer",
    "claves": "rock deporte motivacion"
  },
  {
    "id": "c46",
    "titulo": "Radioactive",
    "artista": "Imagine Dragons",
    "video": "ktvTqknDobU",
    "pista": "welcome to the new age",
    "claves": "rock deporte energia"
  },
  {
    "id": "c47",
    "titulo": "Havana",
    "artista": "Camila Cabello, Young Thug",
    "video": "BQ0mxQXmLsk",
    "pista": "havana ooh na na",
    "claves": "pop latino baile"
  },
  {
    "id": "c48",
    "titulo": "Señorita",
    "artista": "Shawn Mendes, Camila Cabello",
    "video": "Pkh8UtuejGw",
    "pista": "i love it when",
    "claves": "pop latino romantica"
  }
];
let consultaGuardada = "";
const normalizar = texto => String(texto).normalize("NFD").replace(/[\u0300-\u036f]/g,"") .toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
function distancia(a,b) {
  const fila = Array.from({length:b.length+1},(_,i)=>i);
  for (let i=1;i<=a.length;i++) { let anterior=fila[0]; fila[0]=i;
    for (let j=1;j<=b.length;j++) { const vieja=fila[j]; fila[j]=Math.min(fila[j]+1,fila[j-1]+1,anterior+(a[i-1]===b[j-1]?0:1)); anterior=vieja; }
  } return fila[b.length];
}
function buscarCanciones(texto) {
  const q=normalizar(texto); if (!q) return CANCIONES;
  const ignorar=new Set(["la","el","los","las","de","del","un","una","que","por","con","the","a","an","and","to"]);
  const palabras=q.split(" ").filter(x=>!ignorar.has(x)); const tokens=palabras.length?palabras:q.split(" ");
  return CANCIONES.map(tema=>{
    const titulo=normalizar(tema.titulo),artista=normalizar(tema.artista);
    const campos=[titulo,artista,normalizar(tema.pista || ""),normalizar(tema.claves || "")];
    let puntaje=campos.some(c=>c.includes(q)) ? 100 : 0;
    if (titulo===q) puntaje=200; else if (titulo.startsWith(q)) puntaje=150;
    if (!puntaje) { const banco=campos.join(" ").split(" "); let total=0;
      for (const token of tokens) { let mejor=0;
        for (const palabra of banco) { if(token===palabra) mejor=Math.max(mejor,10); else if(token.length>=3 && palabra.startsWith(token)) mejor=Math.max(mejor,8); else if(token.length>=4 && Math.abs(token.length-palabra.length)<=2 && distancia(token,palabra)<=(token.length>=7?2:1)) mejor=Math.max(mejor,5); }
        if (!mejor) return {tema,puntaje:0}; total+=mejor;
      } puntaje=total;
    } return {tema,puntaje};
  }).filter(x=>x.puntaje>0).sort((a,b)=>b.puntaje-a.puntaje || a.tema.titulo.localeCompare(b.tema.titulo,"es")).map(x=>x.tema);
}
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
  if (playerFinal) { playerFinal.destroy(); playerFinal = null; }
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
  const temas = ganadores.map(p => ({p,tema:cancion(estado.propuestas.find(o=>o.autor===p.nombre)?.cancion_id)})).filter(t=>t.tema.video);
  const clave = estado.codigo+":"+temas.map(t=>t.tema.id).join(",");
  if (musicaClave === clave) return;
  limpiarFinal(); musicaClave = clave;
  if (!temas.length) return;
  const panel = $("musica-final"); panel.hidden = false;
  panel.append(elemento("p","EL ENCORE DEL DUELO","categoria"),elemento("h2",temas.length>1?"Las canciones de los ganadores":"La canción del ganador"),
    elemento("p","La elección de la última ronda · fragmento de 30 segundos de YouTube."));
  const nombre = elemento("h3"); const aviso = elemento("p","Preparando el fragmento…","nota"); aviso.setAttribute("role","status");
  const contenedor = elemento("div",undefined,"reproductor-final"); const montaje = elemento("div"); montaje.id = "youtube-final"; contenedor.append(montaje);
  panel.append(nombre,contenedor,aviso);
  let indice = 0;
  const elegirTema = i => {
    if (musicaClave !== clave) return;
    indice = i; const {p,tema} = temas[i]; nombre.textContent = tema.titulo+" — "+tema.artista+" · "+p.nombre;
    if (playerFinal) playerFinal.loadVideoById({videoId:tema.video,startSeconds:30,endSeconds:60});
  };
  if (temas.length > 1) temas.forEach(({p,tema},i) => panel.append(boton(p.nombre+" · "+tema.titulo,() => elegirTema(i))));
  cargarYouTube().then(() => {
    if (musicaClave !== clave || !montaje.isConnected) return;
    nombre.textContent = temas[0].tema.titulo+" — "+temas[0].tema.artista+" · "+temas[0].p.nombre;
    playerFinal = new window.YT.Player(montaje,{host:"https://www.youtube-nocookie.com",width:"100%",height:"300",videoId:temas[0].tema.video,
      playerVars:{autoplay:1,playsinline:1,start:30,end:60,rel:0,origin:location.origin},
      events:{
        onReady:e => { if (musicaClave === clave) e.target.playVideo(); },
        onAutoplayBlocked:() => { aviso.textContent = "Tu navegador requiere un toque: pulsa ▶ en el video para escuchar el fragmento."; },
        onStateChange:e => {
          if (musicaClave !== clave) return;
          if (e.data === 1) aviso.textContent = "♫ Sonando · fragmento de 30 segundos";
          if (e.data === 0) { if (indice+1 < temas.length) elegirTema(indice+1); else aviso.textContent = "Fragmento terminado. ¡Gracias por jugar!"; }
        },
        onError:() => { aviso.textContent = "YouTube no permite reproducir este video aquí o en tu región. Puedes abrirlo con el enlace de abajo."; }
      }});
  }).catch(() => { if (musicaClave === clave) aviso.textContent = "No se pudo conectar con YouTube. Revisa tu conexión."; });
  for (const {tema} of temas) { const enlace = elemento("a","Abrir "+tema.titulo+" en YouTube"); enlace.href = "https://www.youtube.com/watch?v="+tema.video+"&t=30"; enlace.target = "_blank"; enlace.rel = "noopener noreferrer"; panel.append(enlace,elemento("br")); }

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
  $("otra-consigna").disabled = ocupado || !estado || !estado.soy_anfitrion || (estado.seleccionados ?? 0)>0;
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
  if (turno !== turnoOcupadas) { cancionesOcupadas.clear(); turnoOcupadas = turno; consultaGuardada = ""; }
  if (estado && (estado.estado !== datos.estado || estado.ronda !== datos.ronda || estado.codigo !== datos.codigo || estado.consigna_version !== datos.consigna_version)) cerrarEscucha();
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
  const puedeCambiar = ["espera","seleccion"].includes(estado.estado);
  $("control-consigna").hidden = !puedeCambiar;
  $("proxima-consigna").textContent = estado.estado === "espera" ? "Primera consigna: "+(estado.consigna || "Se elegirá al iniciar") : "";
  $("otra-consigna").hidden = !estado.soy_anfitrion;
  $("regla-consigna").textContent = (estado.seleccionados ?? 0)>0 ? "La consigna queda fija: ya hay canciones elegidas." : estado.soy_anfitrion ? "Puedes cambiarla antes de que alguien confirme una canción." : "El anfitrión puede cambiar la consigna antes de que alguien elija.";
  const propia = estado.propuestas.find(p => p.mia);
  const firma = JSON.stringify({
    etapa:estado.estado,ronda:estado.ronda,version:estado.consigna_version,propia:propia?.id,
    yaVote:estado.ya_vote,propuestas:estado.propuestas,
    jugadores:estado.estado === "finalizada" ? estado.participantes : null,
    ocupadas:[...cancionesOcupadas]
  });
  if (estado.estado === "espera") {
    $("consigna").textContent = "Comparte el código con tus amigos";
    $("instrucciones").textContent = estado.participantes.length+"/6 jugadores. "+
      (estado.soy_anfitrion?"Puedes iniciar cuando haya al menos 3.":"Espera a que el anfitrión inicie.");
  } else if (estado.estado === "seleccion") {
    $("consigna").textContent = estado.consigna || CONSIGNAS[estado.ronda-1];
    $("instrucciones").textContent = estado.seleccionados+"/"+estado.participantes.length+
      " canciones enviadas. La votación comienza cuando todos elijan.";
  } else if (estado.estado === "votacion") {
    $("consigna").textContent = estado.consigna || CONSIGNAS[estado.ronda-1];
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
        buscador.placeholder = "Título, artista o una frase que recuerdes"; buscador.autocomplete = "off";
        const catalogo = elemento("div",undefined,"catalogo");
        const ayuda = elemento("p","48 canciones conocidas · busca por título, artista, palabras clave o algunas frases breves. También tolera errores de escritura.","nota");
        const contador = elemento("p",undefined,"nota"); contador.setAttribute("role","status");
        contenido.append(etiqueta,buscador,ayuda,contador,catalogo);
        buscador.value = consultaGuardada;
        const rondaVisible = estado.ronda;
        function dibujarCatalogo() {
          catalogo.replaceChildren();
          consultaGuardada = buscador.value;
          const temas = buscarCanciones(buscador.value);
          contador.textContent = temas.length+" canciones"+(buscador.value.trim() ? " encontradas" : " disponibles");
          for (const tema of temas) {
            const tarjeta = elemento("div",undefined,"cancion");
            const ocupada = cancionesOcupadas.has(tema.id);
            const motivo = "Esta canción ya fue elegida por otro participante en esta ronda. Selecciona otra.";
            tarjeta.append(elemento("strong",tema.titulo),elemento("p",tema.artista),
              boton(ocupada ? "Canción ya seleccionada" : "Elegir",() => abrirEscucha(tema,"elegir",tema.id,rondaVisible),ocupado || ocupada, ocupada ? motivo : ""));
            tarjeta.tabIndex = 0;
            tarjeta.setAttribute("role","group");
            tarjeta.setAttribute("aria-label",tema.titulo+" — ver detalles y elegir");
            tarjeta.addEventListener("click",evento => { if (!evento.target.closest("button")) abrirEscucha(tema,"elegir",tema.id,rondaVisible,ocupada ? motivo : ""); });
            tarjeta.addEventListener("keydown",evento => { if (evento.target === tarjeta && ["Enter"," "].includes(evento.key)) { evento.preventDefault(); abrirEscucha(tema,"elegir",tema.id,rondaVisible,ocupada ? motivo : ""); } });
            if (ocupada) tarjeta.append(elemento("p",motivo,"aviso-regla"));
            catalogo.append(tarjeta);
          }
          if (!temas.length) catalogo.append(elemento("p","No encontramos esa canción en el catálogo de la demo. Prueba con el artista, menos palabras o un título diferente."));
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
$("otra-consigna").addEventListener("click",() => ejecutar("cambiar_consigna",{ronda:estado.ronda,nombre:String(estado.consigna_version ?? 0)}));
$("iniciar").addEventListener("click",() => ejecutar("iniciar"));
$("salir").addEventListener("click",() => ejecutar("salir"));
const invitada = new URLSearchParams(location.search).get("sala");
if (invitada && /^[A-Za-z0-9]{6}$/.test(invitada)) $("codigo").value = invitada.toUpperCase();


let playerFinal = null, promesaYouTube = null;
function cargarYouTube() {
  if (window.YT?.Player) return Promise.resolve();
  if (promesaYouTube) return promesaYouTube;
  promesaYouTube = new Promise((resolve,reject) => {
    window.onYouTubeIframeAPIReady = resolve;
    const script = document.createElement("script"); script.src = "https://www.youtube.com/iframe_api";
    script.onerror = () => { promesaYouTube = null; reject(new Error("YouTube no disponible")); }; document.head.append(script);
  });
  return promesaYouTube;
}
function cerrarEscucha() {
  if ($("escucha").open) { $("escucha").close(); }
}
function abrirEscucha(tema,accion,valor,ronda,motivo="") {
  if (!estado || estado.ronda !== ronda || !["seleccion","votacion"].includes(estado.estado)) return;
  if (estado.estado === "votacion" && plazoLocal !== null && performance.now() >= plazoLocal) return;
  $("escucha-titulo").textContent = tema.titulo;
  $("escucha-artista").textContent = tema.artista;
  $("escucha-estado").textContent = "";
  const version = estado.consigna_version ?? 0;
  $("escucha-regla").textContent = motivo || (accion === "elegir" ? "Confirma esta canción para la consigna actual. No podrás cambiarla después." : "El cronómetro de votación sigue corriendo.");
  const acciones = $("escucha-acciones"); acciones.replaceChildren();
  acciones.append(boton(accion === "elegir" ? "Elegir" : "Votar por esta canción",() => {
    if (!estado || estado.ronda !== ronda || estado.estado !== (accion === "elegir" ? "seleccion" : "votacion") || version !== (estado.consigna_version ?? 0)) { cerrarEscucha(); return; }
    cerrarEscucha(); ejecutar(accion,{valor,ronda,nombre:String(version)});
  },ocupado || !!motivo,motivo));
  if (!$("escucha").open) $("escucha").showModal();

}
$("cerrar-escucha").addEventListener("click",cerrarEscucha);
$("escucha").addEventListener("cancel",cerrarEscucha);


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
