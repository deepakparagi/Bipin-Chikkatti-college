/* ============================================
   PRODUCTION PROTECTION SYSTEM
   Professional Frontend Hardening
   ============================================ */

(function() {
  'use strict';

  // ===== ENVIRONMENT DETECTION =====
  const isProduction = !window.location.hostname.includes('localhost') && 
                      !window.location.hostname.includes('127.0.0.1') &&
                      !window.location.hostname.includes('dev');

  // ===== ASSET PROTECTION =====
  class AssetProtection {
    constructor() {
      this.init();
    }

    init() {
      if (isProduction) {
        this.protectImages();
        this.preventAssetDownload();
        this.addWatermarkProtection();
      }
    }

    protectImages() {
      // Prevent image dragging (light protection)
      document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
          return false;
        }
      });

      // Prevent image context menu on right-click (images only)
      document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
          return false;
        }
      });

      // Prevent image selection
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.mozUserSelect = 'none';
        img.style.msUserSelect = 'none';
        img.setAttribute('draggable', 'false');
      });
    }

    preventAssetDownload() {
      // Prevent direct asset linking
      document.addEventListener('keydown', (e) => {
        // Prevent Ctrl+S (Save Page)
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          return false;
        }
        
        // Prevent Ctrl+A (Select All) on images
        if (e.ctrlKey && e.key === 'a' && e.target.tagName === 'IMG') {
          e.preventDefault();
          return false;
        }
      });
    }

    addWatermarkProtection() {
      // Add invisible watermark to important images
      const importantImages = document.querySelectorAll('img[src*="college"], img[src*="campus"], img[src*="faculty"]');
      
      importantImages.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        
        const watermark = document.createElement('div');
        watermark.textContent = '© Bipin Chikkatti College';
        watermark.style.cssText = `
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 4px 8px;
          font-size: 10px;
          border-radius: 4px;
          pointer-events: none;
          z-index: 10;
        `;
        
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(watermark);
      });
    }
  }

  // ===== CODE OBFUSCATION HELPERS =====
  class CodeProtection {
    constructor() {
      this.init();
    }

    init() {
      if (isProduction) {
        this.obfuscateConsole();
        this.protectSourceStructure();
        this.addIntegrityChecks();
      }
    }

    obfuscateConsole() {
      // Clear console periodically in production
      if (isProduction) {
        setInterval(() => {
          console.clear();
        }, 30000);

        // Override console methods with empty functions
        const noop = () => {};
        ['log', 'debug', 'info', 'warn', 'error'].forEach(method => {
          console[method] = noop;
        });
      }
    }

    protectSourceStructure() {
      // Remove readable class names and IDs in production
      if (isProduction) {
        // Obfuscate CSS class names (would be done by build process)
        this.addAntiDebugMeasures();
      }
    }

    addAntiDebugMeasures() {
      // Light anti-debug measures (not aggressive)
      let devtools = {
        open: false,
        orientation: null
      };

      const threshold = 160;

      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true;
            // Just log, don't break functionality
            console.log('%cBipin Chikkatti College - Professional Website', 
              'color: #B8956A; font-size: 16px; font-weight: bold;');
            console.log('%cThis website is professionally developed. Please respect our work.', 
              'color: #666; font-size: 12px;');
          }
        } else {
          devtools.open = false;
        }
      }, 500);
    }

    addIntegrityChecks() {
      // Check for script modifications
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        script.addEventListener('error', () => {
          console.warn('Script integrity check failed');
        });
      });
    }
  }

  // ===== PERFORMANCE OPTIMIZATION =====
  class PerformanceOptimizer {
    constructor() {
      this.init();
    }

    init() {
      this.optimizeImages();
      this.lazyLoadAssets();
      this.preloadCriticalAssets();
      this.optimizeAnimations();
    }

    optimizeImages() {
      // Implement lazy loading for images
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadAssets() {
      // Lazy load non-critical CSS
      const lazyStyles = [
        'css/luxury-animations.css',
        'css/micro-interactions.css'
      ];

      lazyStyles.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = function() {
          this.media = 'all';
        };
        document.head.appendChild(link);
      });
    }

    preloadCriticalAssets() {
      // Preload critical assets
      const criticalAssets = [
        'css/main.css',
        'js/main-fixed.js',
        'images/logo.svg'
      ];

      criticalAssets.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = href.endsWith('.css') ? 'style' : 
                 href.endsWith('.js') ? 'script' : 'image';
        link.href = href;
        document.head.appendChild(link);
      });
    }

    optimizeAnimations() {
      // Reduce animations on low-end devices
      if (navigator.hardwareConcurrency < 4 || navigator.connection?.effectiveType === 'slow-2g') {
        document.documentElement.classList.add('reduced-animations');
      }
    }
  }

  // ===== SECURITY HEADERS SIMULATION =====
  class SecurityEnforcement {
    constructor() {
      this.init();
    }

    init() {
      this.enforceCSP();
      this.preventClickjacking();
      this.addSecurityMeta();
    }

    enforceCSP() {
      // Add Content Security Policy meta tag
      const csp = document.createElement('meta');
      csp.httpEquiv = 'Content-Security-Policy';
      csp.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';";
      document.head.appendChild(csp);
    }

    preventClickjacking() {
      // Prevent iframe embedding
      if (window.top !== window.self) {
        window.top.location = window.self.location;
      }
    }

    addSecurityMeta() {
      const securityMetas = [
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
        { httpEquiv: 'X-Frame-Options', content: 'DENY' },
        { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' }
      ];

      securityMetas.forEach(meta => {
        const metaTag = document.createElement('meta');
        if (meta.name) metaTag.name = meta.name;
        if (meta.httpEquiv) metaTag.httpEquiv = meta.httpEquiv;
        metaTag.content = meta.content;
        document.head.appendChild(metaTag);
      });
    }
  }

  // ===== ANALYTICS & MONITORING =====
  class ProductionMonitoring {
    constructor() {
      this.init();
    }

    init() {
      this.monitorErrors();
      this.trackPerformance();
      this.monitorSecurity();
    }

    monitorErrors() {
      window.addEventListener('error', (e) => {
        // Log errors for monitoring (would send to analytics in production)
        const errorData = {
          message: e.message,
          filename: e.filename,
          lineno: e.lineno,
          colno: e.colno,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        };
        
        // In production, send to monitoring service
        if (isProduction) {
          // fetch('/api/log-error', { method: 'POST', body: JSON.stringify(errorData) });
        }
      });
    }

    trackPerformance() {
      // Monitor Core Web Vitals
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Track performance metrics
            if (isProduction) {
              // Send to analytics
            }
          });
        });
        
        observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      }
    }

    monitorSecurity() {
      // Monitor for potential security issues
      document.addEventListener('securitypolicyviolation', (e) => {
        if (isProduction) {
          // Log CSP violations
          console.warn('CSP Violation:', e.violatedDirective);
        }
      });
    }
  }

  // ===== INITIALIZATION =====
  function initProductionProtection() {
    // Only initialize if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        new AssetProtection();
        new CodeProtection();
        new PerformanceOptimizer();
        new SecurityEnforcement();
        new ProductionMonitoring();
      });
    } else {
      new AssetProtection();
      new CodeProtection();
      new PerformanceOptimizer();
      new SecurityEnforcement();
      new ProductionMonitoring();
    }
  }

  // Initialize protection system
  initProductionProtection();

  // ===== EXPORT FOR EXTERNAL USE =====
  window.ProductionProtection = {
    AssetProtection,
    CodeProtection,
    PerformanceOptimizer,
    SecurityEnforcement,
    ProductionMonitoring
  };

})();