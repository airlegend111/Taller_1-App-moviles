// ================================
// Script Principal - Simplificado
// ================================

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Header visibility on scroll
let lastScrollY = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
    
    lastScrollY = currentScroll;
});

console.log('App iniciada correctamente');
