/* ============================================
   MAIN JAVASCRIPT - ENHANCED WITH LUXURY ANIMATIONS
   Bipin Chikkatti College
   Premium Interactive Experience
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

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
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
}

// ===== ENHANCED THEME TOGGLE =====
function initThemeToggle() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const navbarToggle = $('.navbar-theme-toggle');
  
  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // Add smooth transition
      document.documentElement.style.transition = 'all 0.5s ease';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Remove transition after animation
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 500);
    });
  }
}

// ===== ENHANCED NAVBAR WITH LUXURY EFFECTS =====
function initNavbar() {
  const navbar = $('.navbar');
  const navbarToggle = $('.navbar-toggle');
  const navbarMenu = $('.navbar-menu');
  const navbarLinks = $$('.navbar-link');
  
  if (!navbar) return;
  
  // Enhanced scroll effect with morphing
  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
      navbar.style.transform = 'translateY(-2px)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.classList.remove('scrolled');
      navbar.style.transform = 'translateY(0)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
  }, 16);
  
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  
  // Enhanced mobile menu with animations
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      const isActive = navbarToggle.classList.contains('active');
      
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      
      // Animate menu items
      if (!isActive) {
        navbarLinks.forEach((link, index) => {
          link.style.transform = 'translateX(100px)';
          link.style.opacity = '0';
          setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.transform = 'translateX(0)';
            link.style.opacity = '1';
          }, index * 100);
        });
      }
      
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
  
  // Enhanced active link highlighting
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

// ===== ADVANCED SCROLL REVEAL SYSTEM =====
function initScrollReveal() {
  const revealElements = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
  
  if (revealElements.length === 0) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Add stagger effect for grouped elements
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children).filter(child => 
          child.classList.contains('reveal') || 
          child.classList.contains('reveal-left') || 
          child.classList.contains('reveal-right')
        );
        
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 150}ms`;
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

// ===== LUXURY ANIMATED COUNTERS =====
function initCounters() {
  const counters = $$('[data-counter]');
  
  if (counters.length === 0) return;
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2500;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Luxury easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);
      
      element.textContent = current.toLocaleString();
      
      // Add pulsing effect during animation
      const scale = 1 + (Math.sin(progress * Math.PI * 4) * 0.05);
      element.style.transform = `scale(${scale})`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString();
        element.style.transform = 'scale(1)';
      }
    };
    
    requestAnimationFrame(animate);
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

// ===== ENHANCED SMOOTH SCROLL =====
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
        
        // Custom smooth scroll with easing
        const startPosition = window.pageYOffset;
        const distance = offsetTop - startPosition;
        const duration = 1000;
        let start = null;
        
        const animation = (currentTime) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // Easing function
          const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
          
          window.scrollTo(0, startPosition + distance * ease);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };
        
        requestAnimationFrame(animation);
      }
    });
  });
}

// ===== LUXURY BACK TO TOP BUTTON =====
function initBackToTop() {
  const backToTop = $('.back-to-top');
  
  if (!backToTop) return;
  
  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    
    if (scrollY > 300) {
      backToTop.classList.add('visible');
      backToTop.style.transform = 'translateY(0) scale(1)';
    } else {
      backToTop.classList.remove('visible');
      backToTop.style.transform = 'translateY(20px) scale(0.8)';
    }
  }, 16);
  
  window.addEventListener('scroll', handleScroll);
  
  backToTop.addEventListener('click', () => {
    // Luxury scroll to top animation
    const duration = 1200;
    const startPosition = window.pageYOffset;
    let start = null;
    
    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Luxury easing
      const ease = 1 - Math.pow(1 - progress, 4);
      
      window.scrollTo(0, startPosition * (1 - ease));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  });
}

// ===== ENHANCED SCROLL PROGRESS BAR =====
function initScrollProgress() {
  const progressBar = $('.scroll-progress');
  
  if (!progressBar) return;
  
  const updateProgress = throttle(() => {
    const scrollTop = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    
    // Add glow effect based on progress
    const intensity = Math.min(progress / 100, 1);
    progressBar.style.boxShadow = `0 0 ${20 * intensity}px rgba(184, 149, 106, ${0.5 * intensity})`;
  }, 16);
  
  window.addEventListener('scroll', updateProgress);
}

// ===== LUXURY ACCORDION =====
function initAccordion() {
  const accordionHeaders = $$('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');
      
      // Close all accordions with animation
      accordionHeaders.forEach(h => {
        h.classList.remove('active');
        const c = h.nextElementSibling;
        c.classList.remove('active');
        c.style.maxHeight = '0px';
        c.style.opacity = '0';
      });
      
      // Open clicked accordion if it was closed
      if (!isOpen) {
        header.classList.add('active');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
      }
    });
  });
}

// ===== ENHANCED FORM VALIDATION =====
function initFormValidation() {
  const forms = $$('[data-validate]');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Add floating label effect
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
        input.style.transform = 'translateY(-2px)';
        input.style.boxShadow = '0 8px 24px rgba(184, 149, 106, 0.2)';
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
        input.style.transform = 'translateY(0)';
        input.style.boxShadow = 'none';
      });
    });
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredInputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#C74B4B';
          input.style.transform = 'translateX(5px)';
          setTimeout(() => {
            input.style.transform = 'translateX(0)';
          }, 200);
        } else {
          input.style.borderColor = 'var(--color-gold)';
        }
      });
      
      if (isValid) {
        // Success animation
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.style.transform = 'scale(0.95)';
          submitBtn.textContent = 'Success!';
          setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
            submitBtn.textContent = 'Submit';
            form.reset();
          }, 1500);
        }
      }
    });
  });
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
  const parallaxElements = $$('.parallax-slow, .parallax-medium, .parallax-fast');
  
  if (parallaxElements.length === 0) return;
  
  const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const rate = scrolled * -0.5;
      let speed = 0.2;
      
      if (element.classList.contains('parallax-medium')) speed = 0.5;
      if (element.classList.contains('parallax-fast')) speed = 0.8;
      
      element.style.transform = `translateY(${rate * speed}px)`;
    });
  }, 16);
  
  window.addEventListener('scroll', handleScroll);
}

// ===== INITIALIZE ALL ENHANCED FEATURES =====
function init() {
  // CRITICAL: Ensure content is visible FIRST
  ensureContentVisibility();
  
  // Initialize enhanced features
  initThemeToggle();
  initNavbar();
  initScrollReveal();
  initCounters();
  initSmoothScroll();
  initBackToTop();
  initScrollProgress();
  initAccordion();
  initFormValidation();
  initParallax();
  
  // Add performance monitoring
  if (navigator.hardwareConcurrency < 4) {
    document.documentElement.classList.add('reduced-animations');
  }
  
  // Add luxury cursor for desktop
  if (window.innerWidth > 1024) {
    document.body.classList.add('luxury-cursor-enabled');
  }
}

// Run immediately - don't wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Also run on page show (for back/forward navigation)
window.addEventListener('pageshow', ensureContentVisibility);

// Handle window resize
window.addEventListener('resize', debounce(() => {
  if (window.innerWidth > 1024) {
    document.body.classList.add('luxury-cursor-enabled');
  } else {
    document.body.classList.remove('luxury-cursor-enabled');
  }
}, 250));