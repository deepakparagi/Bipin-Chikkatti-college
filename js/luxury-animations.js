/* ============================================
   LUXURY ANIMATIONS CONTROLLER
   Advanced Interactive System
   ============================================ */

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function for performance
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

// Throttle function for scroll events
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

// ===== MAGNETIC CURSOR EFFECT =====
class MagneticCursor {
  constructor() {
    this.cursor = null;
    this.magneticElements = $$('.btn, .card, .navbar-link, .magnetic-hover');
    this.init();
  }

  init() {
    // Create custom cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'luxury-cursor';
    this.cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(this.cursor);

    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
      .luxury-cursor {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
      }
      .cursor-dot {
        width: 8px;
        height: 8px;
        background: var(--color-gold);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
      }
      .cursor-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        border: 2px solid var(--color-gold);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        opacity: 0.5;
      }
      .luxury-cursor.hover .cursor-ring {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    });

    this.magneticElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });

      element.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });

      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });
    });
  }
}

// ===== ADVANCED SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.elements = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade');
    this.parallaxElements = $$('.parallax-slow, .parallax-medium, .parallax-fast');
    this.init();
  }

  init() {
    this.createObserver();
    this.initParallax();
    this.initScrollProgress();
  }

  createObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Add stagger delay for grouped elements
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 100}ms`;
        }
      });
    }, options);

    this.elements.forEach(element => {
      observer.observe(element);
    });
  }

  initParallax() {
    const handleScroll = throttle(() => {
      const scrolled = window.pageYOffset;
      
      this.parallaxElements.forEach(element => {
        const rate = scrolled * -0.5;
        const speed = element.classList.contains('parallax-slow') ? 0.2 :
                     element.classList.contains('parallax-medium') ? 0.5 : 0.8;
        
        element.style.transform = `translateY(${rate * speed}px)`;
      });
    }, 16);

    window.addEventListener('scroll', handleScroll);
  }

  initScrollProgress() {
    const progressBar = $('.scroll-progress');
    if (!progressBar) return;

    const updateProgress = throttle(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }, 16);

    window.addEventListener('scroll', updateProgress);
  }
}

// ===== LIQUID MORPHING SYSTEM =====
class LiquidMorph {
  constructor() {
    this.morphElements = $$('.card, .btn, .testimonial, .stat-card');
    this.init();
  }

  init() {
    this.morphElements.forEach(element => {
      this.addMorphEffect(element);
    });
  }

  addMorphEffect(element) {
    element.addEventListener('mouseenter', (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      element.style.setProperty('--mouse-x', `${x}%`);
      element.style.setProperty('--mouse-y', `${y}%`);
      
      // Add ripple effect
      this.createRipple(element, e.clientX - rect.left, e.clientY - rect.top);
    });

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      element.style.setProperty('--mouse-x', `${x}%`);
      element.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  createRipple(element, x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'luxury-ripple';
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(184, 149, 106, 0.3);
      transform: translate(-50%, -50%);
      animation: luxury-ripple-animation 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;

    element.style.position = 'relative';
    element.appendChild(ripple);

    // Add animation keyframes if not exists
    if (!document.querySelector('#luxury-ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'luxury-ripple-keyframes';
      style.textContent = `
        @keyframes luxury-ripple-animation {
          to {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// ===== FLOATING ELEMENTS SYSTEM =====
class FloatingElements {
  constructor() {
    this.floatingElements = $$('.float, .badge, .navbar-logo');
    this.init();
  }

  init() {
    this.floatingElements.forEach((element, index) => {
      this.addFloatingAnimation(element, index);
    });
  }

  addFloatingAnimation(element, index) {
    const amplitude = 10 + (index % 3) * 5;
    const frequency = 0.02 + (index % 2) * 0.01;
    const phase = index * 0.5;
    
    let start = null;
    
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      
      const y = Math.sin((elapsed * frequency) + phase) * amplitude;
      const rotation = Math.sin((elapsed * frequency * 0.5) + phase) * 2;
      
      element.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }
}

// ===== ADVANCED COUNTER ANIMATIONS =====
class LuxuryCounters {
  constructor() {
    this.counters = $$('[data-counter]');
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2500;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);
      
      element.textContent = current.toLocaleString();
      element.style.transform = `scale(${1 + (Math.sin(progress * Math.PI) * 0.1)})`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString();
        element.style.transform = 'scale(1)';
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// ===== SMOOTH PAGE TRANSITIONS =====
class PageTransitions {
  constructor() {
    this.init();
  }

  init() {
    // Add page transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, var(--color-cream), var(--color-ivory));
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s ease;
      pointer-events: none;
    `;
    document.body.appendChild(overlay);

    // Handle internal links
    $$('a[href^="/"], a[href^="./"], a[href$=".html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !link.hasAttribute('target')) {
          e.preventDefault();
          this.transitionToPage(href);
        }
      });
    });
  }

  transitionToPage(url) {
    const overlay = $('.page-transition-overlay');
    
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    
    setTimeout(() => {
      window.location.href = url;
    }, 250);
  }
}

// ===== THEME TOGGLE ENHANCEMENT =====
class LuxuryThemeToggle {
  constructor() {
    this.toggle = $('.navbar-theme-toggle');
    this.init();
  }

  init() {
    if (!this.toggle) return;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateToggleIcon(savedTheme);

    this.toggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class
    document.documentElement.classList.add('theme-transitioning');
    
    // Change theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    this.updateToggleIcon(newTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 500);
  }

  updateToggleIcon(theme) {
    const sunIcon = this.toggle.querySelector('.sun-icon');
    const moonIcon = this.toggle.querySelector('.moon-icon');
    
    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }
}

// ===== PERFORMANCE MONITOR =====
class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.init();
  }

  init() {
    this.monitor();
    
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency < 4) {
      document.documentElement.classList.add('reduced-animations');
    }
  }

  monitor() {
    const now = performance.now();
    this.frameCount++;
    
    if (now - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
      
      // Adjust animations based on performance
      if (this.fps < 30) {
        document.documentElement.classList.add('low-performance');
      } else {
        document.documentElement.classList.remove('low-performance');
      }
    }
    
    requestAnimationFrame(() => this.monitor());
  }
}

// ===== INITIALIZE LUXURY ANIMATIONS =====
function initLuxuryAnimations() {
  // Check if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
    return;
  }

  // Initialize all animation systems
  new MagneticCursor();
  new ScrollAnimations();
  new LiquidMorph();
  new FloatingElements();
  new LuxuryCounters();
  new PageTransitions();
  new LuxuryThemeToggle();
  new PerformanceMonitor();

  // Add global animation styles
  const globalStyles = document.createElement('style');
  globalStyles.textContent = `
    .theme-transitioning * {
      transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease !important;
    }
    
    .reduced-animations *,
    .low-performance * {
      animation-duration: 0.1s !important;
      transition-duration: 0.1s !important;
    }
    
    .reduced-motion * {
      animation: none !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(globalStyles);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLuxuryAnimations);
} else {
  initLuxuryAnimations();
}

// Export for external use
window.LuxuryAnimations = {
  MagneticCursor,
  ScrollAnimations,
  LiquidMorph,
  FloatingElements,
  LuxuryCounters,
  PageTransitions,
  LuxuryThemeToggle,
  PerformanceMonitor
};