/* =====================================================
   MAIN.JS - JavaScript para interactividad
   FUNCIONALIDADES:
   - Cambiar estilo del header al hacer scroll
   - Slider draggable en "Featured Engagements"
   - Animaciones al hacer scroll
   ===================================================== */

// =====================================================
// 1. SCROLL EVENT - Header Styling
// =====================================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Cambiar clase del header cuando scrollea más de 50px
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// =====================================================
// 2. DRAGGABLE SLIDER - Featured Engagements
// =====================================================
const slider = document.getElementById('featuredSlider');
let isDown = false;
let startX;
let scrollLeft;

// Mouse down
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

// Mouse leave
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
});

// Mouse up
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
});

// Mouse move
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1; // Velocidad de scroll
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

// =====================================================
// 3. SCROLL ANIMATIONS - Apariciones suaves
// =====================================================
// Intersección Observer para detectar elementos en el viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Agregar clase para activar animación
            entry.target.classList.add('in-view');
            // Dejar de observar una vez que se ha animado
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Seleccionar todos los elementos que deben animarse
const animateElements = document.querySelectorAll(
    '.featured-section, .about-section, .services-section, .journal-section, .brands-section'
);

// Agregar clase scroll-animate y observar
animateElements.forEach((element) => {
    element.classList.add('scroll-animate');
    observer.observe(element);
});

// =====================================================
// 4. SMOOTH SCROLL PARA ENLACES ANCLA (Mejorado)
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Excluir si es solo "#"
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// =====================================================
// 5. BOTONES CTA - Agregar funcionalidad
// =====================================================
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-talk');

ctaButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        // Efecto ripple al hacer click
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Aquí puedes agregar lógica adicional
        // Por ejemplo, scroll a sección o mostrar modal
        console.log('Botón clickeado:', button.textContent);
    });
});

// =====================================================
// 6. EFECTOS DE HOVER EN TARJETAS (Opcional)
// =====================================================
const cards = document.querySelectorAll('.project-card, .service-card, .journal-card');

cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        card.style.cursor = 'pointer';
    });
    
    card.addEventListener('click', () => {
        // Aquí puedes agregar lógica para abrir modal o ir a detalles
        console.log('Tarjeta clickeada');
    });
});

// =====================================================
// 7. LAZY LOADING PARA IMÁGENES (Cuando las agregues)
// =====================================================
// Descomentar cuando agregues imágenes reales
/*
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('lazy-loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
    });
}
*/

// =====================================================
// 8. DEBOUNCE FUNCTION (Optimización)
// =====================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =====================================================
// 9. RESIZE HANDLER (Responsive adjustments)
// =====================================================
const handleResize = debounce(() => {
    // Aquí puedes agregar lógica para ajustes responsive
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// =====================================================
// 10. INICIALIZACIÓN
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ NEXUS Agency - Página cargada');
    console.log('✓ Header scroll effects activo');
    console.log('✓ Slider draggable listo');
    console.log('✓ Scroll animations iniciadas');
});

// =====================================================
// NOTAS PARA DESARROLLO FUTURO:
// ===================================================== 
// - Agregar modal para ver detalles de proyectos
// - Implementar formulario de contacto funcional
// - Agregar animaciones de página (transitions)
// - Integrar sistema de comentarios en blog
// - Lazy loading para imágenes reales
// - Service Worker para PWA
// - Analytics tracking
// =====================================================
