/* ============================================
   ENHANCED MOBILE JAVASCRIPT
   Optimized for Phone Devices
   ============================================ */

// Mobile-specific utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Mobile detection
const isMobile = () => window.innerWidth <= 767;
const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// ===== ENHANCED MOBILE NAVIGATION =====
function initMobileNavigation() {
  const navbarToggle = $('.navbar-toggle');
  const navbarMenu = $('.navbar-menu');
  const navbarLinks = $$('.navbar-link');
  const navbar = $('.navbar');
  
  if (!navbarToggle || !navbarMenu) return;
  
  // Mobile menu toggle with enhanced animations
  navbarToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isActive = navbarToggle.classList.contains('active');
    
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  function openMobileMenu() {
    navbarToggle.classList.add('active');
    navbarMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(backdrop);
    
    // Animate backdrop
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
    });
    
    // Close on backdrop click
    backdrop.addEventListener('click', closeMobileMenu);
  }
  
  function closeMobileMenu() {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    
    // Remove backdrop
    const backdrop = $('.mobile-menu-backdrop');
    if (backdrop) {
      backdrop.style.opacity = '0';
      setTimeout(() => {
        backdrop.remove();
      }, 300);
    }
  }
  
  // Close menu when clicking links
  navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Close menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 767 && navbarMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

// ===== MOBILE SCROLL OPTIMIZATION =====
function initMobileScrollOptimization() {
  if (!isMobile()) return;
  
  let ticking = false;
  let lastScrollY = 0;
  const navbar = $('.navbar');
  
  function updateNavbar() {
    const scrollY = window.pageYOffset;
    const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
    
    if (navbar) {
      if (scrollY > 100 && scrollDirection === 'down') {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ===== MOBILE TOUCH INTERACTIONS =====
function initMobileTouchInteractions() {
  if (!isTouch()) return;
  
  // Enhanced touch feedback for buttons
  const touchElements = $$('.btn, .card, .navbar-link, .touch-feedback');
  
  touchElements.forEach(element => {
    element.addEventListener('touchstart', function(e) {
      this.classList.add('touch-active');
    }, { passive: true });
    
    element.addEventListener('touchend', function(e) {
      setTimeout(() => {
        this.classList.remove('touch-active');
      }, 150);
    }, { passive: true });
    
    element.addEventListener('touchcancel', function(e) {
      this.classList.remove('touch-active');
    }, { passive: true });
  });
  
  // Prevent zoom on double tap for buttons
  const preventZoomElements = $$('.btn, .navbar-toggle, .form-input');
  
  preventZoomElements.forEach(element => {
    let lastTouchEnd = 0;
    element.addEventListener('touchend', function(e) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  });
}

// ===== MOBILE FORM ENHANCEMENTS =====
function initMobileFormEnhancements() {
  if (!isMobile()) return;
  
  const formInputs = $$('.form-input, .form-textarea, .form-select');
  
  formInputs.forEach(input => {
    // Auto-scroll to input when focused (prevents keyboard covering input)
    input.addEventListener('focus', function() {
      setTimeout(() => {
        this.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300); // Wait for keyboard animation
    });
    
    // Enhanced validation feedback
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.classList.add('error');
      } else {
        this.classList.remove('error');
      }
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error') && this.value.trim()) {
        this.classList.remove('error');
      }
    });
  });
}

// ===== MOBILE PERFORMANCE OPTIMIZATION =====
function initMobilePerformanceOptimization() {
  if (!isMobile()) return;
  
  // Reduce animation complexity on mobile
  const animatedElements = $$('.animate, .hover-effect, .reveal');
  
  animatedElements.forEach(element => {
    element.style.animationDuration = '0.3s';
    element.style.transitionDuration = '0.3s';
  });
  
  // Optimize images for mobile
  const images = $$('img');
  
  images.forEach(img => {
    // Add loading="lazy" for better performance
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Optimize image rendering
    img.style.imageRendering = 'auto';
  });
  
  // Debounce resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Trigger any resize-dependent functions
      initMobileScrollOptimization();
    }, 250);
  });
}

// ===== MOBILE ACCESSIBILITY ENHANCEMENTS =====
function initMobileAccessibility() {
  if (!isMobile()) return;
  
  // Add skip link for mobile navigation
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-navy, #1a365d);
    color: white;
    padding: 8px 12px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1002;
    font-size: 14px;
    transition: top 0.3s ease;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Ensure main content has proper ID
  const mainContent = $('main') || $('.page-wrapper') || $('body > section:first-child');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
  }
  
  // Enhanced focus management
  const focusableElements = $$('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--color-gold, #d4af37)';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });
}

// ===== MOBILE SWIPE GESTURES =====
function initMobileSwipeGestures() {
  if (!isTouch()) return;
  
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  
  const minSwipeDistance = 50;
  const maxVerticalDistance = 100;
  
  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    
    // Check if it's a horizontal swipe
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < maxVerticalDistance) {
      const navbarMenu = $('.navbar-menu');
      
      if (deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
        // Swipe right - close menu if open
        if (navbarMenu && navbarMenu.classList.contains('active')) {
          const navbarToggle = $('.navbar-toggle');
          if (navbarToggle) {
            navbarToggle.click();
          }
        }
      }
    }
  }, { passive: true });
}

// ===== MOBILE VIEWPORT HANDLING =====
function initMobileViewportHandling() {
  if (!isMobile()) return;
  
  // Handle viewport height changes (mobile browser address bar)
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setViewportHeight();
  
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
  });
  
  // Update CSS to use custom viewport height
  const style = document.createElement('style');
  style.textContent = `
    .mobile-full-height {
      height: calc(var(--vh, 1vh) * 100);
    }
    
    .hero {
      min-height: calc(var(--vh, 1vh) * 100 - 60px);
    }
  `;
  document.head.appendChild(style);
}

// ===== MOBILE LOADING OPTIMIZATION =====
function initMobileLoadingOptimization() {
  if (!isMobile()) return;
  
  // Prioritize above-the-fold content
  const hero = $('.hero');
  const navbar = $('.navbar');
  
  if (hero) {
    hero.style.willChange = 'transform';
  }
  
  if (navbar) {
    navbar.style.willChange = 'transform';
  }
  
  // Remove will-change after animations complete
  setTimeout(() => {
    if (hero) hero.style.willChange = 'auto';
    if (navbar) navbar.style.willChange = 'auto';
  }, 3000);
  
  // Lazy load non-critical elements
  const lazyElements = $$('.lazy-load, .section:not(:first-child)');
  
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        lazyObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '50px'
  });
  
  lazyElements.forEach(element => {
    lazyObserver.observe(element);
  });
}

// ===== INITIALIZE MOBILE ENHANCEMENTS =====
function initMobileEnhancements() {
  // Only run mobile enhancements on mobile devices
  if (isMobile()) {
    initMobileNavigation();
    initMobileScrollOptimization();
    initMobileTouchInteractions();
    initMobileFormEnhancements();
    initMobilePerformanceOptimization();
    initMobileAccessibility();
    initMobileSwipeGestures();
    initMobileViewportHandling();
    initMobileLoadingOptimization();
    
    console.log('Mobile enhancements initialized');
  }
}

// ===== AUTO-INITIALIZE =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileEnhancements);
} else {
  initMobileEnhancements();
}

// Re-initialize on resize (device orientation change)
window.addEventListener('resize', () => {
  if (isMobile()) {
    initMobileEnhancements();
  }
});

// Export functions for manual initialization if needed
window.MobileEnhancements = {
  init: initMobileEnhancements,
  navigation: initMobileNavigation,
  touch: initMobileTouchInteractions,
  forms: initMobileFormEnhancements,
  accessibility: initMobileAccessibility
};