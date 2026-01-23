/*
  clave/script.js

  Responsabilidades:
  - Conectar el teclado en pantalla (botones) con el campo tipo password.
  - Soportar entrada desde teclado físico (0-9) y Backspace.
  - Mantener el foco en el input para mejorar la experiencia cuando se usan
    tanto la pantalla táctil como el teclado físico.

  Notas de diseño:
  - No hay validación ni envío; esto es una demo del control de entrada.
  - "Borrar" implementa un comportamiento tipo Backspace (elimina último carácter).
  - No se realizan envíos de red ni persistencia de la contraseña.
*/

// Ejecutar la inicialización cuando la ventana carga
window.onload = init;

function init(){
  // Elemento input donde se coloca la clave (tipo password para ocultar dígitos)
  const input = document.getElementById('claveInput');
  // Todas las teclas del teclado visual
  const teclas = Array.from(document.querySelectorAll('#teclado .tecla'));

  // Añadir manejador click a cada botón del keypad
  teclas.forEach(btn => {
    btn.addEventListener('click', ()=>{
      const val = btn.value;
      if(btn.classList.contains('borrar')){
        // Si es la tecla borrar: eliminar el último carácter
        input.value = input.value.slice(0, -1);
      } else {
        // Añadir el dígito al final del valor actual
        input.value = input.value + val;
      }
      // Mantener foco en el input para permitir escribir con teclado físico inmediatamente
      input.focus();
    });
  });

  // Soporte teclado físico: escuchar keydown globalmente
  // - Números 0-9: se añaden al input
  // - Backspace: elimina último carácter
  // Usamos keydown y e.preventDefault() para evitar side-effects (ej. navegación)
  document.addEventListener('keydown', (e)=>{
    if(!input) return;
    if(e.key >= '0' && e.key <= '9'){
      input.value = input.value + e.key;
      e.preventDefault();
    } else if(e.key === 'Backspace'){
      input.value = input.value.slice(0,-1);
      e.preventDefault();
    }
  });
}
