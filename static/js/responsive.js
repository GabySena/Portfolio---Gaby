// Script para melhorar a responsividade do site

document.addEventListener('DOMContentLoaded', function() {
    // Navegação responsiva - adiciona classe quando rola a página
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Rolando para baixo
            nav.classList.add('hidden');
        } else {
            // Rolando para cima
            nav.classList.remove('hidden');
        }
        
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Adiciona classe ativa ao link de navegação atual
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Ajusta o carrossel para dispositivos móveis
    function adjustCarousel() {
        const carouselContainer = document.querySelector('.carrossel-container');
        if (carouselContainer) {
            if (window.innerWidth <= 768) {
                carouselContainer.style.aspectRatio = '4/3';
            } else {
                carouselContainer.style.aspectRatio = '16/9';
            }
        }
    }
    
    window.addEventListener('resize', adjustCarousel);
    adjustCarousel(); // Executa na carga inicial
    
    // Melhora a experiência de toque em dispositivos móveis
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Adiciona suporte a toque para o carrossel
        const carouselImages = document.querySelectorAll('.carrossel-imagem');
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // Swipe para a esquerda - próximo projeto
                navegarProjeto(1);
            } else if (touchEndX > touchStartX) {
                // Swipe para a direita - projeto anterior
                navegarProjeto(-1);
            }
        }
    }
});

