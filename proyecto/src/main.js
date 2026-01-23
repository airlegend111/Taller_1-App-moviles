/* =====================================================
   MAIN.JS - Interactividad NEXUS (Tipo BASIC/DEPT)
   FUNCIONALIDADES:
   - Locomotive Scroll para scroll suave
   - Header dinámico según scroll
   - Cursor personalizado con estados
   - Slider draggable en Featured Engagements
   ===================================================== */

// =====================================================
// 0. LOCOMOTIVE SCROLL - Inicialización
// ===================================================== 
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    inertia: 0.8,
    class: 'is-reveal'
});

// =====================================================
// 1. HEADER SCROLL BEHAVIOR - Tipo BASIC/DEPT
// [Detecta scroll y cambia estilo del header]
// =====================================================
const header = document.getElementById('header');

// Escuchar eventos de scroll con Locomotive
scroll.on('scroll', (obj) => {
    const heroHeight = document.getElementById('hero').offsetHeight;
    
    // Si scrolleamos más allá del hero, agregamos clase
    if (obj.y > heroHeight - 100) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// =====================================================
// 2. CUSTOM CURSOR - Sigue el mouse (BASIC/DEPT style)
// [Cursor personalizado que responde a interacciones]
// =====================================================
const customCursor = document.getElementById('customCursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Velocidad de interpolación del cursor
const cursorSpeed = 0.25;

// Escuchar movimiento del mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animar cursor suavemente con RequestAnimationFrame
function animateCursor() {
    // Interpolación suave del cursor
    cursorX += (mouseX - cursorX) * cursorSpeed;
    cursorY += (mouseY - cursorY) * cursorSpeed;
    
    customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Detectar interacciones con elementos
const interactiveElements = document.querySelectorAll(
    'a, button, .project-card, .journal-item--interactive'
);

interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        customCursor.classList.add('custom-cursor--link');
    });
// =====================================================
// 3. DRAGGABLE SLIDER - Featured Engagements
// [Slider draggable para proyectos]
// =====================================================
const slider = document.getElementById('featuredSlider');
const sliderWrapper = document.querySelector('.featured-slider-wrapper');

if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Soporte para touch (móvil)
    let touchStartX = 0;
    let touchScrollLeft = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchScrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        const touchCurrentX = e.touches[0].clientX;
        const touchWalk = (touchStartX - touchCurrentX) * 1.5;
        slider.scrollLeft = touchScrollLeft + touchWalk;
    });
}

// =====================================================
// 4. SCROLL ANIMATIONS - Apariciones suaves con Locomotive
// =====================================================
const animateElements = document.querySelectorAll(
    '.featured-section, .about-section, .services-section, .featured-news, .brands-section'
);

animateElements.forEach((element) => {
    element.setAttribute('data-scroll', '');
});

// =====================================================
// 5. SMOOTH SCROLL PARA ENLACES ANCLA
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                scroll.scrollTo(target);
            }
        }
    });
});

// =====================================================
// 6. EFECTOS DE HOVER EN TARJETAS
// =====================================================
const allCards = document.querySelectorAll('.project-card, .service-card, .journal-item--interactive');

allCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
});

// =====================================================
// 7. INICIALIZACIÓN
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ NEXUS Agency - Página cargada');
    console.log('✓ Locomotive Scroll inicializado');
    console.log('✓ Custom Cursor activo (Tipo BASIC/DEPT)');
    console.log('✓ Header scroll effects activo');
    console.log('✓ Slider draggable listo');
    console.log('✓ Scroll animations iniciadas');
    
    setTimeout(() => {
        scroll.update();
    }, 100);
});

    element.addEventListener('mouseleave', () => {
        customCursor.classList.remove('custom-cursor--link');
    });
});