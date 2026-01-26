/*
  clave/script.js

  Responsabilidades:
  - Conectar el teclado en pantalla (botones) con el campo tipo password.
  - Soportar entrada desde teclado físico (0-9) y Backspace.
  - Mantener el foco en el input para mejorar la experiencia cuando se usan
    tanto la pantalla táctil como el teclado físico.
  - Ocultar números cuando el mouse no está sobre las teclas.
  - Aleatorizar el orden de los números cada vez que se escribe.
  - Mover el mouse fuera del teclado para reiniciar el proceso.

  Notas de diseño:
  - No hay validación ni envío; esto es una demo del control de entrada.
  - "Borrar" implementa un comportamiento tipo Backspace (elimina último carácter).
  - No se realizan envíos de red ni persistencia de la contraseña.
*/

// Ejecutar la inicialización cuando la ventana carga
window.onload = init;

// Función para barajar array (Fisher-Yates shuffle)
function shuffle(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Función para aleatorizar el orden de los números en el teclado
function randomizeKeyboard(teclas) {
  // Obtener solo las teclas numéricas (no la de borrar)
  const numericKeys = teclas.filter(t => !t.classList.contains('borrar'));
  const deleteKey = teclas.find(t => t.classList.contains('borrar'));
  
  // Barajar los números
  const shuffledNumbers = shuffle(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  
  // Asignar los números barajados a las teclas numéricas
  numericKeys.forEach((key, index) => {
    key.value = shuffledNumbers[index];
    key.dataset.actualValue = shuffledNumbers[index];
  });
}

function init(){
  // Elemento input donde se coloca la clave (tipo password para ocultar dígitos)
  const input = document.getElementById('claveInput');
  // Todas las teclas del teclado visual
  const teclas = Array.from(document.querySelectorAll('#teclado .tecla'));
  
  // Inicializar el teclado con números aleatorios
  randomizeKeyboard(teclas);
  
  // Ocultar inicialmente los números (mostrar solo al pasar el mouse)
  const teclado = document.getElementById('teclado');
  teclado.classList.add('numeros-ocultos');

  // Añadir eventos de mouse al contenedor del teclado
  teclado.addEventListener('mouseenter', () => {
    teclado.classList.remove('numeros-ocultos');
  });

  teclado.addEventListener('mouseleave', () => {
    teclado.classList.add('numeros-ocultos');
    // Mover el mouse lejos del teclado
    // Nota: no podemos mover el mouse programáticamente por razones de seguridad del navegador
    // Pero podemos simular visualmente que el mouse se fue
  });

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
        
        // Después de escribir: aleatorizar el teclado y ocultarlo
        randomizeKeyboard(teclas);
        teclado.classList.add('numeros-ocultos');
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
      // Aleatorizar después de escribir
      randomizeKeyboard(teclas);
      teclado.classList.add('numeros-ocultos');
      e.preventDefault();
    } else if(e.key === 'Backspace'){
      input.value = input.value.slice(0,-1);
      e.preventDefault();
    }
  });
}
