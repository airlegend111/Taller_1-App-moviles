/*
  menu/script.js

  Funcionalidad:
  - Proporciona scroll suave cuando se hace click en los enlaces del menú.
  - Mantiene la clase "active" en el enlace correspondiente a la sección visible.
  - Usa IntersectionObserver para detectar la sección activa (mejor rendimiento).
  - Provee un fallback por scroll si IntersectionObserver no está disponible.

  Consideraciones:
  - No modifica el hash de la URL (previene comportamiento por defecto del enlace)
    para evitar saltos bruscos; si quieres mantener el hash, se puede añadir
    history.pushState o location.hash según necesidad.
*/

(function(){
  const nav = document.getElementById('nav');
  const links = Array.from(nav.querySelectorAll('.nav-link'));
  // Mapear cada link a la sección correspondiente (querySelector con el href)
  const sections = links.map(l => document.querySelector(l.getAttribute('href')));

  // Scroll suave al hacer click en el menú
  links.forEach(link => {
    link.addEventListener('click', (ev) => {
      ev.preventDefault(); // evitar salto inmediato al fragmento
      const target = document.querySelector(link.getAttribute('href'));
      if(!target) return;
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // actualizar estado activo inmediatamente para feedback instantáneo
      setActive(link);
    });
  });

  // Añade o quita la clase active en los enlaces
  function setActive(link){
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  }

  // Detectar sección visible usando IntersectionObserver cuando esté disponible
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if(ent.isIntersecting){
          const id = '#' + ent.target.id;
          const link = nav.querySelector(`a[href="${id}"]`);
          if(link) setActive(link);
        }
      });
    }, { root: null, rootMargin: '-30% 0px -50% 0px', threshold: 0 });

    // Observar cada sección encontrada
    sections.forEach(s => { if(s) obs.observe(s); });
  } else {
    // Fallback para navegadores viejos: calcular la sección más cercana al top
    window.addEventListener('scroll', ()=>{
      let best = sections[0];
      let bestDist = Infinity;
      sections.forEach(s => {
        if(!s) return;
        const rect = s.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if(dist < bestDist){ best = s; bestDist = dist; }
      });
      const link = nav.querySelector(`a[href="#${best.id}"]`);
      if(link) setActive(link);
    });
  }
})();