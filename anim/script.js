/*
  anim/script.js

  Resumen:
  - Controla las animaciones de la escena (nube, bici, sol, arbol, montañas) usando GSAP.
  - Reproduce un efecto sonoro (campana) cuando la bici completa una vuelta usando Howler
    si está disponible, con Web Audio API como fallback (beep simple).
  - Provee funciones startAnimations() y stopAnimations() que se ligan a controles
    en el DOM (botones Iniciar/Detener). También hay un checkbox para mutear Howler.

  Dependencias externas:
  - GSAP (se carga desde CDN en anim/index.html)
  - Howler (se carga desde CDN en anim/index.html) — opcional, se usa si está presente

  Notas de comportamiento:
  - La reproducción de audio suele requerir una interacción previa del usuario.
    Por ello startAnimations() se llama desde un botón (user gesture) y initAudio()
    intenta crear/resumir el AudioContext.
  - stopAnimations() detiene tanto las timelines de GSAP como los sonidos Howler.
*/

let timelines = [];
let running = false;
let audioCtx = null;
let bgHowl = null; // placeholder si quieres usar Howler para fondo

// Inicializar sonidos con Howler usando los archivos locales en la carpeta Sonidos/
const sounds = {
  // Si Howler está disponible, creamos un objeto Howl para la campana
  bell: (window.Howler ? new Howl({ src: ['Sonidos/bike-bell-173588.mp3'], loop: false, volume: 0.9, html5: true }) : null)
};

// Crea AudioContext si aún no existe (necesario para Web Audio fallback beep)
function initAudio(){
  if(!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// beep() - pequeño sonido de ayuda usando Web Audio API como fallback
function beep(){
  try{
    initAudio();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.value = 880; // A5-ish
    g.gain.value = 0.06;
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    setTimeout(()=>{ o.stop(); }, 120);
  }catch(e){
    console.warn('WebAudio no disponible', e);
  }
}

// startAnimations() - crea las animaciones GSAP y enlaza el parallax
function startAnimations(){
  if(running) return;
  running = true;

  // Nube: se mueve horizontalmente en loop (simula viento)
  const nube = gsap.to('#nube', { x: 900, duration: 25, repeat: -1, ease: 'linear' });

  // Sol: pulso suave (scale) en yoyo continuo
  const sol = gsap.to('#sol', { scale: 1.06, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' });

  // Bici: movimiento horizontal constante; onRepeat reproduce la campana
  try { gsap.set('#bici', { x: -150 }); } catch(e) {}
  const bici = gsap.to('#bici', {
    x: 950,
    duration: 6,
    repeat: -1,
    ease: 'linear',
    onRepeat: () => {
      // Intentar reproducir con Howler; si no está, usar beep() como fallback
      try {
        if(window.Howler && sounds && sounds.bell){
          sounds.bell.play();
        } else {
          beep();
        }
      } catch(e){ try{ beep(); }catch(_){} }
    }
  });

  // Árbol: balanceo leve continuo
  const arbol = gsap.to('#arbol', { rotation: 3, duration: 2.6, yoyo: true, repeat: -1, transformOrigin: '50% 100%', ease: 'sine.inOut' });

  // Parallax simple para montañas según posición del ratón
  const parallaxHandler = (e) => {
    const cx = window.innerWidth / 2;
    const dx = (e.clientX - cx) / cx;
    gsap.to('#nevado', { x: dx * -12, duration: 0.8 });
    gsap.to('#nevado2', { x: dx * 12, duration: 0.8 });
  };
  window.addEventListener('mousemove', parallaxHandler);

  // Guardar referencias para poder detenerlas después
  timelines = [nube, sol, bici, arbol];
  timelines._parallax = parallaxHandler;

  // Pequeño beep al iniciar para dar feedback al usuario
  beep();
}

// stopAnimations() - detiene todas las animaciones y sonidos en curso
function stopAnimations(){
  if(!running) return;
  running = false;
  // Detener timelines de GSAP
  timelines.forEach(t => { try{ t.kill(); }catch(e){} });
  if(timelines._parallax) window.removeEventListener('mousemove', timelines._parallax);
  timelines = [];

  // Detener Howler/sonidos si existen
  try{
    if(window.Howler){
      try{ Howler.stop(); }catch(e){}
    }
    if(typeof sounds !== 'undefined' && sounds){
      try{ if(sounds.bell && sounds.bell.stop) sounds.bell.stop(); }catch(e){}
    }
    if(bgHowl && bgHowl.stop) try{ bgHowl.stop(); }catch(e){}
  }catch(e){/* silent */}
}

// Inicializar handlers de controles (start/stop/mute) cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', ()=>{
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const muteCb = document.getElementById('muteCb');

  startBtn.addEventListener('click', ()=>{
    // Muchos navegadores requieren interacción del usuario para reproducir audio
    initAudio();
    if(audioCtx && audioCtx.state === 'suspended'){
      // Reanudar AudioContext en la interacción del usuario
      audioCtx.resume();
    }
    startAnimations();
  });

  stopBtn.addEventListener('click', ()=>{
    stopAnimations();
  });

  muteCb.addEventListener('change', (e)=>{
    const muted = e.target.checked;
    // If using Howler, toggle mute globally
    if(window.Howler) Howler.mute(muted);
    // El beep por WebAudio no tiene flag global aquí; es un volumen muy bajo.
  });
});
