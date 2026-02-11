// Génération d'étoiles
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Smooth scroll pour la navigation
document.addEventListener('DOMContentLoaded', function() {
    // Créer les étoiles
    createStars();
    
    // Gestion du scroll smooth pour les ancres
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Animation des barres de compétences au scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les sections de compétences
    const skillsSections = document.querySelectorAll('.skills-category-full, .skills-section');
    skillsSections.forEach(section => observer.observe(section));
    
    // Highlight de la page active dans la navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// Fonction pour faire défiler vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Animation d'apparition au scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Gestion du menu mobile (si nécessaire)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        nav.classList.toggle('mobile-active');
    }
}

// Parallax effect pour la planète flottante
document.addEventListener('mousemove', function(e) {
    const planet = document.querySelector('.floating-planet');
    if (!planet) return;
    
    const speed = 5;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    
    planet.style.transform = `translate(${x}px, ${y}px)`;
});

// Console easter egg
console.log(`
╔════════════════════════════════════════╗
║                                        ║
║   "On ne voit bien qu'avec le cœur.   ║
║    L'essentiel est invisible          ║
║         pour les yeux."                ║
║                                        ║
║         — Le Petit Prince              ║
║                                        ║
╚════════════════════════════════════════╝

Bienvenue sur mon portfolio ! 🚀
Développé avec passion pour l'aérospatiale ✨
`);
