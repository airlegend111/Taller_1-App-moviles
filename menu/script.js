(function(){
  const nav = document.getElementById('nav');
  const links = Array.from(nav.querySelectorAll('.nav-link'));
  const sections = links.map(l => document.querySelector(l.getAttribute('href')));

  // Scroll suave al hacer click en el menú
  links.forEach(link => {
    link.addEventListener('click', (ev) => {
      ev.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(!target) return;
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // actualizar estado activo inmediatamente
      setActive(link);
    });
  });

  function setActive(link){
    links.forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
  }

  // Destacar según el scroll: IntersectionObserver + fallback
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if(ent.isIntersecting){
          const id = '#' + ent.target.id;
          const link = nav.querySelector(`a[href="${id}"]`);
          if(link) setActive(link);
        }
      });
    }, {root:null,rootMargin:'-30% 0px -50% 0px',threshold:0});

    sections.forEach(s => { if(s) obs.observe(s); });
  } else {
    // Fallback: onscroll check
    window.addEventListener('scroll', ()=>{
      let best = sections[0];
      let bestDist = Infinity;
      sections.forEach(s=>{
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