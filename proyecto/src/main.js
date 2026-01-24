const header = document.getElementById('header');
const hero = document.getElementById('hero');
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuLinks = document.querySelectorAll('.menu-overlay-link');
const customCursor = document.getElementById('customCursor');
const featuredSlider = document.getElementById('featuredSlider');
const navLinks = document.querySelectorAll('.nav-link');

let lastScrollTop = 0;
let scrollDirection = 'down';
let isMenuOpen = false;
let locomotiveScroll;

let ticking = false;

const headerObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.remove('header--scrolled');
            header.classList.add('header--on-hero');
        }
    });
}, headerObserverOptions);

const heroOutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            header.classList.remove('header--on-hero');
            header.classList.add('header--scrolled');
        }
    });
}, { threshold: 0.99 });

heroObserver.observe(hero);
heroOutObserver.observe(hero);

const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (isMenuOpen) {
        return;
    }
    
    if (scrollTop > lastScrollTop) {
        scrollDirection = 'down';
        if (scrollTop > 100) {
            if (!header.classList.contains('header--hidden')) {
                header.classList.add('header--hidden');
            }
        }
    } else {
        scrollDirection = 'up';
        if (header.classList.contains('header--hidden')) {
            header.classList.remove('header--hidden');
            header.classList.add('header--animate-in');
            
            setTimeout(() => {
                header.classList.remove('header--animate-in');
            }, 400);
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
    ticking = false;
}, false);

hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    menuOverlay.classList.toggle('menu-overlay--open');
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
});

menuClose.addEventListener('click', () => {
    isMenuOpen = false;
    hamburger.classList.remove('active');
    menuOverlay.classList.remove('menu-overlay--open');
    document.body.style.overflow = 'auto';
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        menuOverlay.classList.remove('menu-overlay--open');
        document.body.style.overflow = 'auto';
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
    customCursor.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    customCursor.classList.remove('active');
});

const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .journal-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        customCursor.classList.add('custom-cursor--link');
    });
    element.addEventListener('mouseleave', () => {
        customCursor.classList.remove('custom-cursor--link');
    });
});

let isDragging = false;
let startX = 0;
let scrollLeft = 0;

featuredSlider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - featuredSlider.offsetLeft;
    scrollLeft = featuredSlider.scrollLeft;
    customCursor.classList.add('custom-cursor--drag');
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - featuredSlider.offsetLeft;
    const walk = (x - startX) * 2;
    featuredSlider.scrollLeft = scrollLeft - walk;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    customCursor.classList.remove('custom-cursor--drag');
});

featuredSlider.addEventListener('mouseleave', () => {
    isDragging = false;
    customCursor.classList.remove('custom-cursor--drag');
});

const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target') || 'work';
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const initLocomotiveScroll = () => {
    locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        class: 'is-reveal',
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    locomotiveScroll.on('scroll', ({ scroll }) => {
        const scrollTop = scroll.y;
        
        if (isMenuOpen) {
            return;
        }
        
        if (scrollTop > lastScrollTop) {
            scrollDirection = 'down';
            if (scrollTop > 100) {
                if (!header.classList.contains('header--hidden')) {
                    header.classList.add('header--hidden');
                }
            }
        } else {
            scrollDirection = 'up';
            if (header.classList.contains('header--hidden')) {
                header.classList.remove('header--hidden');
                header.classList.add('header--animate-in');
                
                setTimeout(() => {
                    header.classList.remove('header--animate-in');
                }, 400);
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    window.addEventListener('resize', () => {
        locomotiveScroll.update();
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocomotiveScroll);
} else {
    initLocomotiveScroll();
}
