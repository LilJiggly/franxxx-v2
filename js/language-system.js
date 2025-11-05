/* Language System JavaScript - Created for multilingual functionality */

class LanguageSystem {
  constructor() {
    this.currentLanguage = "nl"; // Default language
    this.translations = {};
    this.isLoading = false;

    this.init();
  }

  async init() {
    try {
      // Load translations from JSON file
      await this.loadTranslations();

      // Get saved language preference or detect browser language
      this.currentLanguage =
        this.getSavedLanguage() || this.detectBrowserLanguage();

      // Initialize language toggle
      this.initializeLanguageToggle();

      // Apply initial language
      await this.switchLanguage(this.currentLanguage, false);

      console.log("Language system initialized successfully");
    } catch (error) {
      console.error("Failed to initialize language system:", error);
    }
  }

  async loadTranslations() {
    try {
      const response = await fetch("./data/translations.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.translations = await response.json();
    } catch (error) {
      console.error("Failed to load translations:", error);
      throw error;
    }
  }

  initializeLanguageToggle() {
    // Find existing language toggle in HTML
    const toggleContainer = document.querySelector(".language-toggle");
    if (!toggleContainer) {
      console.error("Language toggle not found in HTML");
      return;
    }

    // Update initial active state
    const langButtons = toggleContainer.querySelectorAll(".lang-btn");
    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === this.currentLanguage);
    });

    // Add event listeners
    langButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetLang = e.target.dataset.lang;
        if (targetLang !== this.currentLanguage) {
          this.switchLanguage(targetLang);
        }
      });
    });
  }

  async switchLanguage(language, animate = true) {
    if (this.isLoading || !this.translations[language]) {
      return;
    }

    this.isLoading = true;
    const toggle = document.querySelector(".language-toggle");
    if (toggle) toggle.classList.add("loading");

    try {
      // Add fade out effect if animating
      if (animate) {
        document.body.classList.add("fade-transition");
        await this.delay(150);
      }

      // Update current language
      this.currentLanguage = language;

      // Update all translatable elements
      this.updateContent();

      // Update toggle buttons
      this.updateToggleButtons();

      // Update HTML lang attribute
      document.documentElement.lang = language;

      // Save language preference
      this.saveLanguage(language);

      // Update SEO tags for new language
      if (window.seoManager) {
        window.seoManager.onLanguageChange(language);
      }

      // Update price calculator for new language
      if (window.priceCalculator) {
        window.priceCalculator.onLanguageChange(language);
      }

      // Update structured data for new language
      if (window.structuredDataManager) {
        window.structuredDataManager.onLanguageChange(language);
      }

      // Add fade in effect if animating
      if (animate) {
        await this.delay(50);
        document.body.classList.remove("fade-transition");
        document.body.classList.add("fade-in");

        setTimeout(() => {
          document.body.classList.remove("fade-in");
        }, 300);
      }
    } catch (error) {
      console.error("Error switching language:", error);
    } finally {
      this.isLoading = false;
      if (toggle) toggle.classList.remove("loading");
    }
  }

  updateContent() {
    const currentTranslations = this.translations[this.currentLanguage];

    // Update navigation
    this.updateNavigation(currentTranslations.nav);

    // Update header
    this.updateSection("header", currentTranslations.header);

    // Update intro section
    this.updateSection("intro", currentTranslations.intro);

    // Update services section
    this.updateSection("services", currentTranslations.services);

    // Update contact section
    this.updateSection("contact", currentTranslations.contact);

    // Update form elements
    this.updateSection("form", currentTranslations.form);

    // Update footer
    this.updateSection("footer", currentTranslations.footer);
  }

  updateNavigation(navTranslations) {
    const navLinks = document.querySelectorAll(".nav-link[data-translate]");

    navLinks.forEach((link) => {
      const translateKey = link.getAttribute("data-translate");
      if (translateKey && translateKey.startsWith("nav.")) {
        const key = translateKey.replace("nav.", "");
        if (navTranslations[key]) {
          link.textContent = navTranslations[key];
        }
      }
    });
  }

  updateSection(sectionName, sectionTranslations) {
    // Generic function to update any section
    Object.keys(sectionTranslations).forEach((key) => {
      const element = document.querySelector(
        `[data-translate="${sectionName}-${key}"]`
      );
      if (element && typeof sectionTranslations[key] === "string") {
        element.textContent = sectionTranslations[key];
      }
    });

    // Handle nested objects (like service cards)
    if (sectionName === "services") {
      this.updateServiceCards(sectionTranslations);
    }

    if (sectionName === "footer") {
      this.updateFooter(sectionTranslations);
    }
  }

  updateServiceCards(servicesTranslations) {
    // Update service cards
    const cards = ["transport", "roadside", "storage"];
    cards.forEach((cardType, index) => {
      const cardNumber = index + 1;
      const titleElement = document.querySelector(
        `.card-${cardNumber} .card-title`
      );
      const descElement = document.querySelector(`.card-${cardNumber} .card-p`);

      if (titleElement && servicesTranslations[cardType]) {
        titleElement.textContent = servicesTranslations[cardType].title;
      }

      if (descElement && servicesTranslations[cardType]) {
        descElement.textContent = servicesTranslations[cardType].description;
      }
    });
  }

  updateFooter(footerTranslations) {
    // Update footer sections
    const footerSections = document.querySelectorAll(".footer-text");

    if (footerSections[0] && footerTranslations.contact) {
      const title = footerSections[0].querySelector("h4");
      if (title) title.textContent = footerTranslations.contact.title;
    }

    if (footerSections[1] && footerTranslations.hours) {
      const title = footerSections[1].querySelector("h4");
      const text = footerSections[1].querySelector("p");
      if (title) title.textContent = footerTranslations.hours.title;
      if (text) text.textContent = footerTranslations.hours.text;
    }

    if (footerSections[2] && footerTranslations.location) {
      const title = footerSections[2].querySelector("h4");
      const text = footerSections[2].querySelector("p");
      if (title) title.textContent = footerTranslations.location.title;
      if (text) text.textContent = footerTranslations.location.text;
    }

    // Update copyright
    const copyright = document.querySelector("footer > p:last-child");
    if (copyright && footerTranslations.copyright) {
      copyright.textContent = footerTranslations.copyright;
    }
  }

  updateToggleButtons() {
    const buttons = document.querySelectorAll(".lang-btn");
    buttons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === this.currentLanguage);
    });
  }

  getSavedLanguage() {
    return localStorage.getItem("franxvan-language");
  }

  saveLanguage(language) {
    localStorage.setItem("franxvan-language", language);
  }

  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith("en") ? "en" : "nl";
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Initialize language system when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.languageSystem = new LanguageSystem();
});
