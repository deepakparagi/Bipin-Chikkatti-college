/* ============================================
   MAIN JAVASCRIPT - STABILITY PRIORITY
   Bipin Chikkatti College
   Content Visibility First
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

// ===== CRITICAL: ENSURE CONTENT VISIBILITY =====
function ensureContentVisibility() {
  // Remove any stuck loaders immediately
  const loaders = $$('.primary-loader, .secondary-loader, .loading-screen');
  loaders.forEach(loader => {
    if (loader) {
      loader.style.display = 'none';
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }
  });
  
  // Ensure body is visible and scrollable
  document.body.style.overflow = '';
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  
  // Ensure main content is visible
  const main = $('main');
  if (main) {
    main.style.visibility = 'visible';
    main.style.opacity = '1';
    main.style.display = 'block';
  }
  
  // Make all reveal elements visible immediately
  const revealElements = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
  revealElements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.visibility = 'visible';
    el.classList.add('active');
  });
}

// ===== THEME TOGGLE (DARK MODE) =====
function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const navbarToggle = $('.navbar-theme-toggle');
  
  if (navbarToggle) {
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
      const isOpen = navbarToggle.classList.contains('active');
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      document.body.style.overflow = !isOpen ? 'hidden' : '';
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
      } else {
        link.classList.remove('active');
      }
    });
  };
  
  setActiveLink();
}

// ===== SMOOTH PAGE TRANSITIONS =====
function initPageTransitions() {
  const secondaryLoader = $('.secondary-loader');
  const navLinks = $$('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');

  if (!secondaryLoader) return;

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === window.location.pathname.split('/').pop()) return;

      e.preventDefault();
      
      // Show secondary loader
      secondaryLoader.style.display = 'flex';
      secondaryLoader.style.visibility = 'visible';
      secondaryLoader.style.opacity = '1';
      
      const progress = secondaryLoader.querySelector('.secondary-loader-progress');
      if (progress) {
        progress.style.width = '0%';
        setTimeout(() => {
          progress.style.width = '100%';
        }, 50);
      }

      // Navigate after transition delay
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });

  // Handle entry animation
  window.addEventListener('load', () => {
    setTimeout(() => {
      secondaryLoader.style.opacity = '0';
      setTimeout(() => {
        secondaryLoader.style.display = 'none';
        secondaryLoader.style.visibility = 'hidden';
      }, 500);
    }, 300);
  });
}

// ===== SIMPLIFIED SCROLL REVEAL =====
function initScrollReveal() {
  const revealElements = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (revealElements.length === 0) return;
  
  // Ensure all elements are visible by default
  revealElements.forEach(el => {
    el.classList.add('active');
  });
  
  // Optional: Add intersection observer for animation effect
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });
    
    revealElements.forEach(el => observer.observe(el));
  }
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

// ===== INITIALIZE ALL =====
function init() {
  // CRITICAL: Ensure content is visible FIRST
  ensureContentVisibility();
  
  // Then initialize other features
  initThemeToggle();
  initNavbar();
  initPageTransitions();
  initScrollReveal();
  initCounters();
  initSmoothScroll();
  initBackToTop();
  initScrollProgress();
  initAccordion();
  initFormValidation();
}

// Run immediately - don't wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Also run on page show (for back/forward navigation)
window.addEventListener('pageshow', ensureContentVisibility);
