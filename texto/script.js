/*
  texto/script.js

  Función:
  - Actualiza en tiempo real el número de caracteres escritos dentro del
    textarea con id="mensaje".

  Diseño:
  - No impone límites, sólo muestra la longitud actual. Esto permite pegar
    texto largo o escribir sin restricciones.
  - Usa el evento 'input' para recibir cambios en el contenido (incluye pegado).
*/

const ta = document.getElementById('mensaje');
const contador = document.getElementById('contador');

function updateCount(){
  // Obtiene la longitud actual del contenido del textarea y actualiza el DOM
  const len = ta.value.length;
  contador.textContent = `${len} caracteres`;
}

// Al cargarse el DOM, ligamos el evento input y lanzamos una actualización inicial
document.addEventListener('DOMContentLoaded', ()=>{
  ta.addEventListener('input', updateCount);
  updateCount();
});
