// Integración del teclado por botón y soporte de teclado físico
window.onload = init;

function init(){
  const input = document.getElementById('claveInput');
  const teclas = Array.from(document.querySelectorAll('#teclado .tecla'));

  teclas.forEach(btn => {
    btn.addEventListener('click', ()=>{
      const val = btn.value;
      if(btn.classList.contains('borrar')){
        // borrar último dígito (backspace)
        input.value = input.value.slice(0, -1);
      } else {
        input.value = input.value + val;
      }
      // mantener foco en el input
      input.focus();
    });
  });

  // Soporte teclado físico: números y Backspace
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
