/* Performance Optimizations - Phase 3 SEO Enhancement */

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Initialize performance optimizations
    this.setupLazyLoading();
    this.setupIntersectionObserver();
    this.setupPreloadOptimizations();
    this.setupAccessibilityEnhancements();

    console.log("Performance optimizations initialized");
  }

  setupLazyLoading() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("loading" in HTMLImageElement.prototype) {
      // Native lazy loading is supported
      images.forEach((img) => {
        img.loading = "lazy";
      });
    } else {
      // Fallback for browsers that don't support native lazy loading
      this.setupIntersectionObserverForImages();
    }
  }

  setupIntersectionObserverForImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  setupIntersectionObserver() {
    // Optimize animations and heavy content loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    // Observe sections for performance optimizations
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));
  }

  setupPreloadOptimizations() {
    // Preload critical resources when user shows intent
    this.setupHoverPreloading();
    this.setupCriticalResourceHints();
  }

  setupHoverPreloading() {
    // Preload pages when user hovers over links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          // Preload any images in the target section
          const images = target.querySelectorAll("img[data-src]");
          images.forEach((img) => {
            if (!img.src) {
              img.src = img.dataset.src;
            }
          });
        }
      });
    });
  }

  setupCriticalResourceHints() {
    // Add resource hints for better performance
    const head = document.head;

    // Preconnect to external domains
    const preconnects = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    preconnects.forEach((url) => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = url;
        if (url.includes("gstatic")) {
          link.crossOrigin = "anonymous";
        }
        head.appendChild(link);
      }
    });
  }

  setupAccessibilityEnhancements() {
    // Enhance keyboard navigation
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupARIAEnhancements();
  }

  setupKeyboardNavigation() {
    // Improve keyboard navigation for mobile menu
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !isExpanded);

        if (!isExpanded) {
          // Focus first menu item when menu opens
          const firstMenuItem = navMenu.querySelector(".nav-link");
          if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 100);
          }
        }
      });

      // Close menu with Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
          navToggle.click();
          navToggle.focus();
        }
      });
    }
  }

  setupFocusManagement() {
    // Manage focus for better accessibility
    const skipLink = document.querySelector(".skip-link");

    if (skipLink) {
      skipLink.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute("href"));
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }

  setupARIAEnhancements() {
    // Add dynamic ARIA attributes
    const priceResult = document.getElementById("price-result");

    if (priceResult) {
      // Announce price calculation results to screen readers
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "style"
          ) {
            const isVisible = priceResult.style.display !== "none";
            priceResult.setAttribute("aria-live", isVisible ? "polite" : "off");
          }
        });
      });

      observer.observe(priceResult, { attributes: true });
    }
  }

  // Method to optimize Core Web Vitals
  optimizeWebVitals() {
    // Optimize Largest Contentful Paint (LCP)
    this.optimizeLCP();

    // Optimize First Input Delay (FID)
    this.optimizeFID();

    // Optimize Cumulative Layout Shift (CLS)
    this.optimizeCLS();
  }

  optimizeLCP() {
    // Preload hero image
    const heroImage = document.querySelector(".header-banner-image");
    if (heroImage) {
      const computedStyle = window.getComputedStyle(heroImage);
      const backgroundImage = computedStyle.backgroundImage;

      if (backgroundImage && backgroundImage !== "none") {
        const imageUrl = backgroundImage.slice(4, -1).replace(/"/g, "");
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = imageUrl;
        document.head.appendChild(link);
      }
    }
  }

  optimizeFID() {
    // Break up long tasks
    if ("scheduler" in window && "postTask" in window.scheduler) {
      // Use modern scheduler API when available
      window.scheduler.postTask(
        () => {
          this.setupNonCriticalFeatures();
        },
        { priority: "background" }
      );
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        this.setupNonCriticalFeatures();
      }, 0);
    }
  }

  optimizeCLS() {
    // Reserve space for dynamic content
    const priceResult = document.getElementById("price-result");
    if (priceResult) {
      priceResult.style.minHeight = "200px";
    }
  }

  setupNonCriticalFeatures() {
    // Initialize non-critical features after main content loads
    console.log("Non-critical features initialized");
  }
}

// Initialize performance optimizations
document.addEventListener("DOMContentLoaded", () => {
  new PerformanceOptimizer();
});
