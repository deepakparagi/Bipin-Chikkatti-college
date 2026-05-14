/* ============================================
   ASSET OPTIMIZATION SYSTEM
   Professional Production Asset Management
   ============================================ */

(function() {
  'use strict';

  // ===== LAZY LOADING SYSTEM =====
  class LazyLoader {
    constructor() {
      this.imageObserver = null;
      this.cssObserver = null;
      this.init();
    }

    init() {
      this.setupImageLazyLoading();
      this.setupCSSLazyLoading();
      this.setupScriptLazyLoading();
    }

    setupImageLazyLoading() {
      // Convert all images to lazy loading
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add blur-up effect
        if (!img.complete) {
          img.style.filter = 'blur(5px)';
          img.style.transition = 'filter 0.3s ease';
          
          img.addEventListener('load', () => {
            img.style.filter = 'none';
          });
        }
      });

      // Intersection Observer for advanced lazy loading
      if ('IntersectionObserver' in window) {
        this.imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              this.imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
          this.imageObserver.observe(img);
        });
      }
    }

    setupCSSLazyLoading() {
      // Lazy load non-critical CSS
      const nonCriticalCSS = [
        { href: 'css/luxury-animations.css', media: 'print' },
        { href: 'css/micro-interactions.css', media: 'print' },
        { href: 'css/scroll-animations.css', media: 'print' }
      ];

      nonCriticalCSS.forEach(css => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = css.href;
        link.media = css.media;
        
        link.addEventListener('load', function() {
          this.media = 'all';
        });
        
        document.head.appendChild(link);
      });
    }

    setupScriptLazyLoading() {
      // Lazy load non-critical scripts
      const nonCriticalScripts = [
        'js/luxury-animations.js',
        'js/production-protection.js'
      ];

      // Load scripts after page load
      window.addEventListener('load', () => {
        setTimeout(() => {
          nonCriticalScripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
          });
        }, 1000);
      });
    }
  }

  // ===== IMAGE OPTIMIZATION =====
  class ImageOptimizer {
    constructor() {
      this.init();
    }

    init() {
      this.optimizeImages();
      this.addWebPSupport();
      this.setupResponsiveImages();
    }

    optimizeImages() {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        // Add decoding attribute for better performance
        img.decoding = 'async';
        
        // Add fetchpriority for hero images
        if (img.closest('.hero-responsive')) {
          img.fetchPriority = 'high';
        }
        
        // Optimize image loading
        if (!img.hasAttribute('sizes') && img.hasAttribute('srcset')) {
          img.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
        }
      });
    }

    addWebPSupport() {
      // Check WebP support and replace images
      const supportsWebP = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      };

      if (supportsWebP()) {
        const images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
        
        images.forEach(img => {
          const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          
          // Test if WebP version exists
          const testImg = new Image();
          testImg.onload = () => {
            img.src = webpSrc;
          };
          testImg.src = webpSrc;
        });
      }
    }

    setupResponsiveImages() {
      // Add responsive image attributes
      const images = document.querySelectorAll('img:not([srcset])');
      
      images.forEach(img => {
        const src = img.src;
        if (src && !src.includes('svg')) {
          // Generate responsive srcset (would be done by build process)
          const baseName = src.replace(/\.[^/.]+$/, '');
          const extension = src.split('.').pop();
          
          const srcset = [
            `${baseName}-320w.${extension} 320w`,
            `${baseName}-640w.${extension} 640w`,
            `${baseName}-1024w.${extension} 1024w`,
            `${baseName}-1440w.${extension} 1440w`
          ].join(', ');
          
          img.srcset = srcset;
          img.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
        }
      });
    }
  }

  // ===== FONT OPTIMIZATION =====
  class FontOptimizer {
    constructor() {
      this.init();
    }

    init() {
      this.preloadFonts();
      this.optimizeFontDisplay();
      this.addFontFallbacks();
    }

    preloadFonts() {
      const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
      ];

      criticalFonts.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
        
        // Load the actual stylesheet
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = href;
        styleLink.media = 'print';
        styleLink.onload = function() {
          this.media = 'all';
        };
        document.head.appendChild(styleLink);
      });
    }

    optimizeFontDisplay() {
      // Add font-display: swap to existing font faces
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: 'Playfair Display';
          font-display: swap;
        }
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    }

    addFontFallbacks() {
      // Ensure proper font fallbacks
      document.documentElement.style.setProperty('--font-serif', '"Playfair Display", Georgia, "Times New Roman", serif');
      document.documentElement.style.setProperty('--font-sans', '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif');
    }
  }

  // ===== CRITICAL RESOURCE HINTS =====
  class ResourceHints {
    constructor() {
      this.init();
    }

    init() {
      this.addDNSPrefetch();
      this.addPreconnect();
      this.addPreload();
    }

    addDNSPrefetch() {
      const domains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'images.unsplash.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
      });
    }

    addPreconnect() {
      const criticalDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      criticalDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    }

    addPreload() {
      const criticalAssets = [
        { href: 'css/production-optimized.css', as: 'style' },
        { href: 'js/main-fixed.js', as: 'script' },
        { href: 'images/logo.svg', as: 'image' }
      ];

      criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset.href;
        link.as = asset.as;
        if (asset.as === 'style' || asset.as === 'script') {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
    }
  }

  // ===== CACHE OPTIMIZATION =====
  class CacheOptimizer {
    constructor() {
      this.init();
    }

    init() {
      this.setupServiceWorker();
      this.optimizeCaching();
    }

    setupServiceWorker() {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    }

    optimizeCaching() {
      // Add cache headers via meta tags (for static hosting)
      const cacheControl = document.createElement('meta');
      cacheControl.httpEquiv = 'Cache-Control';
      cacheControl.content = 'public, max-age=31536000';
      document.head.appendChild(cacheControl);
    }
  }

  // ===== PERFORMANCE MONITORING =====
  class PerformanceMonitor {
    constructor() {
      this.init();
    }

    init() {
      this.monitorCoreWebVitals();
      this.optimizeForPerformance();
    }

    monitorCoreWebVitals() {
      // Monitor Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          
          // Log LCP (would send to analytics in production)
          console.log('LCP:', lastEntry.startTime);
        });
        
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Monitor Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          
          entries.forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          console.log('CLS:', clsValue);
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }
    }

    optimizeForPerformance() {
      // Reduce animations on low-end devices
      if (navigator.hardwareConcurrency < 4) {
        document.documentElement.classList.add('reduced-performance');
      }

      // Optimize for slow connections
      if (navigator.connection) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          document.documentElement.classList.add('slow-connection');
        }
      }
    }
  }

  // ===== INITIALIZATION =====
  function initAssetOptimization() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        new LazyLoader();
        new ImageOptimizer();
        new FontOptimizer();
        new ResourceHints();
        new CacheOptimizer();
        new PerformanceMonitor();
      });
    } else {
      new LazyLoader();
      new ImageOptimizer();
      new FontOptimizer();
      new ResourceHints();
      new CacheOptimizer();
      new PerformanceMonitor();
    }
  }

  // Initialize optimization
  initAssetOptimization();

  // Export for external use
  window.AssetOptimization = {
    LazyLoader,
    ImageOptimizer,
    FontOptimizer,
    ResourceHints,
    CacheOptimizer,
    PerformanceMonitor
  };

})();