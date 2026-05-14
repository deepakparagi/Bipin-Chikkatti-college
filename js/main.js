/* ============================================
   MAIN JAVASCRIPT
   Bipin Chikkatti College
   ============================================ */

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function
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

// ===== THEME TOGGLE (DARK MODE) =====
function initThemeToggle() {
  // Get saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Find navbar theme toggle
  const navbarToggle = $('.navbar-theme-toggle');
  
  if (navbarToggle) {
    // Toggle theme on click
    navbarToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = $('.navbar');
  const navbarToggle = $('.navbar-toggle');
  const navbarMenu = $('.navbar-menu');
  const navbarLinks = $$('.navbar-link');
  
  if (!navbar) return;
  
  // Scroll effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', debounce(handleScroll, 10));
  handleScroll();
  
  // Mobile menu toggle
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    navbarLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Active link highlighting
  const setActiveLink = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navbarLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  };
  
  setActiveLink();
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
  const revealElements = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (revealElements.length === 0) return;
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// ===== ANIMATED COUNTER =====
function initCounters() {
  const counters = $$('[data-counter]');
  
  if (counters.length === 0) return;
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  const links = $$('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = $(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
  const backToTop = $('.back-to-top');
  
  if (!backToTop) return;
  
  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };
  
  window.addEventListener('scroll', debounce(handleScroll, 10));
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
  const progressBar = $('.scroll-progress');
  
  if (!progressBar) return;
  
  const updateProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  };
  
  window.addEventListener('scroll', debounce(updateProgress, 10));
}

// ===== ACCORDION =====
function initAccordion() {
  const accordionHeaders = $$('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');
      
      // Close all accordions
      accordionHeaders.forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.classList.remove('active');
        h.nextElementSibling.style.maxHeight = null;
      });
      
      // Open clicked accordion if it was closed
      if (!isOpen) {
        header.classList.add('active');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
  const forms = $$('[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#C74B4B';
        } else {
          input.style.borderColor = 'var(--color-border)';
        }
      });
      
      if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
      }
    });
  });
}

// ===== SIMPLIFIED LOADER SYSTEM (STABILITY PRIORITY) =====
function initLoaderSystem() {
  const primaryLoader = $('.primary-loader');
  const secondaryLoader = $('.secondary-loader');
  const loadingScreen = $('.loading-screen');
  
  // IMMEDIATELY hide all loaders to ensure content visibility
  if (primaryLoader) {
    primaryLoader.style.display = 'none';
  }
  
  if (secondaryLoader) {
    secondaryLoader.style.display = 'none';
  }
  
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
  
  // IMMEDIATELY restore body scrolling
  document.body.style.overflow = '';
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
}

// ===== REMOVE NAVIGATION LOADER (CAUSING ISSUES) =====
function initNavigationLoader() {
  // Disabled - was causing content visibility issues
  // Navigation now works without loaders
}

// ===== LOADING SCREEN (LEGACY FALLBACK) =====
function initLoadingScreen() {
  const loadingScreen = $('.loading-screen');
  
  if (loadingScreen && !$('.primary-loader') && !$('.secondary-loader')) {
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 600);
    }, 600);
  } else if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

// ===== PARALLAX EFFECT =====
function initParallax() {
  const parallaxElements = $$('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  const handleParallax = () => {
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
      const rect = el.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${rate}px)`;
      }
    });
  };
  
  window.addEventListener('scroll', debounce(handleParallax, 10));
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  const buttons = $$('.btn, .navbar-cta, .back-to-top, .theme-toggle');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Subtle magnetic effect
      const moveX = x * 0.15;
      const moveY = y * 0.15;
      
      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

// ===== SMOOTH CURSOR INTERACTIONS =====
function initCursorEffects() {
  const interactiveElements = $$('a, button, .card, .hover-lift');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.style.cursor = 'pointer';
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.style.cursor = '';
    });
  });
}

// ===== ENHANCED SCROLL REVEAL =====
function initEnhancedScrollReveal() {
  const revealElements = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
  
  if (revealElements.length === 0) return;
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add stagger effect for grouped elements
        const parent = entry.target.parentElement;
        const siblings = parent ? Array.from(parent.children).filter(el => 
          el.classList.contains('reveal') || 
          el.classList.contains('reveal-left') || 
          el.classList.contains('reveal-right') ||
          el.classList.contains('reveal-scale')
        ) : [];
        
        const index = siblings.indexOf(entry.target);
        
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 50); // Stagger by 50ms
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// ===== IMAGE HOVER PARALLAX =====
function initImageParallax() {
  const images = $$('.card img, .image-zoom img');
  
  images.forEach(img => {
    const parent = img.parentElement;
    
    parent.addEventListener('mousemove', (e) => {
      const rect = parent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      img.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
    });
    
    parent.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });
}

// ===== INITIALIZE ALL =====
function init() {
  initLoaderSystem();
  initNavigationLoader();
  initThemeToggle();
  initNavbar();
  initEnhancedScrollReveal();
  initCounters();
  initSmoothScroll();
  initBackToTop();
  initScrollProgress();
  initAccordion();
  initFormValidation();
  initParallax();
  initMagneticButtons();
  initCursorEffects();
  initImageParallax();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
