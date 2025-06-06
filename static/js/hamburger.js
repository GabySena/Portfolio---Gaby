// Script para o menu hamburger

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Função para alternar o menu
    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Acessibilidade - aria-expanded
        const isExpanded = hamburgerMenu.classList.contains('active');
        hamburgerMenu.setAttribute('aria-expanded', isExpanded);
    }
    
    // Evento de clique no hamburger
    hamburgerMenu.addEventListener('click', toggleMenu);
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnHamburger = hamburgerMenu.contains(event.target);
        
        if (nav.classList.contains('active') && !isClickInsideNav && !isClickOnHamburger) {
            toggleMenu();
        }
    });
    
    // Acessibilidade - suporte a teclado
    hamburgerMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    
    // Adicionar atributos de acessibilidade
    hamburgerMenu.setAttribute('role', 'button');
    hamburgerMenu.setAttribute('tabindex', '0');
    hamburgerMenu.setAttribute('aria-expanded', 'false');
    hamburgerMenu.setAttribute('aria-controls', 'main-menu');
    nav.setAttribute('id', 'main-menu');
});

