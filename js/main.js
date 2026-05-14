/* ============================================
   BIPIN CHIKKATTI COLLEGE - STABILITY MASTER SCRIPT
   Version: 3.0 (Nuclear Stability Mode)
   ============================================ */

/**
 * Ensures all loading screens and overlays are permanently disabled.
 */
function forceClearLoaders() {
    const loaders = [
        '.primary-loader',
        '.secondary-loader',
        '.loading-screen',
        '.loader-wrapper',
        '.premium-loader',
        '.page-transition-overlay'
    ];
    
    loaders.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = 'none';
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
            el.style.pointerEvents = 'none';
            el.style.zIndex = '-9999';
            // Actually remove it if possible
            setTimeout(() => {
                if (el.parentNode) el.parentNode.removeChild(el);
            }, 100);
        });
    });

    document.body.style.overflow = 'visible';
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper) {
        pageWrapper.style.opacity = '1';
        pageWrapper.style.visibility = 'visible';
        pageWrapper.style.display = 'block';
    }

    // Force all reveal elements to be visible immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade').forEach(el => {
        el.classList.add('active');
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
    });
}

/**
 * Theme Toggling Logic
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Navbar Logic
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            
            // Lock body scroll when menu is open on mobile
            if (navbarMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'visible';
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbarMenu && navbarMenu.classList.contains('active') && !navbarMenu.contains(e.target) && !navbarToggle.contains(e.target)) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });

    // Handle Scroll Effects
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Set Active State based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navbarLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Back to Top Logic
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize Everything
 */
function init() {
    forceClearLoaders();
    initThemeToggle();
    initNavbar();
    initBackToTop();
    
    console.log("Stability initialized successfully.");
}

// Start as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Failsafe: Run again after 500ms to catch late-loading elements
setTimeout(forceClearLoaders, 500);
setTimeout(forceClearLoaders, 2000);

// Visibility Failsafe for Back/Forward Cache
window.addEventListener('pageshow', (event) => {
    forceClearLoaders();
});
