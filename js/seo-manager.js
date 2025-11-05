/* SEO Manager - Dynamic meta tag updates for multilingual site */

class SEOManager {
  constructor() {
    this.currentLanguage = "nl";
    this.translations = {};
  }

  async init() {
    try {
      // Load translations
      const response = await fetch("./data/translations.json");
      this.translations = await response.json();

      // Set initial SEO tags
      this.updateSEOTags(this.currentLanguage);

      console.log("SEO Manager initialized");
    } catch (error) {
      console.error("Failed to initialize SEO Manager:", error);
    }
  }

  updateSEOTags(language) {
    if (!this.translations[language] || !this.translations[language].seo) {
      return;
    }

    const seo = this.translations[language].seo;

    // Update document title
    document.title = seo.title;

    // Update meta description
    this.updateMetaTag("name", "description", seo.description);

    // Update meta keywords
    this.updateMetaTag("name", "keywords", seo.keywords);

    // Update Open Graph tags
    this.updateMetaTag("property", "og:title", seo.ogTitle);
    this.updateMetaTag("property", "og:description", seo.ogDescription);

    // Update Twitter Card tags
    this.updateMetaTag("name", "twitter:title", seo.ogTitle);
    this.updateMetaTag("name", "twitter:description", seo.ogDescription);

    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Update canonical URL based on language
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const baseUrl = "https://www.franxvan.nl/";
      canonical.href = language === "en" ? baseUrl + "en/" : baseUrl;
    }

    this.currentLanguage = language;
  }

  updateMetaTag(attribute, name, content) {
    let tag = document.querySelector(`meta[${attribute}="${name}"]`);

    if (tag) {
      tag.setAttribute("content", content);
    } else {
      // Create new meta tag if it doesn't exist
      tag = document.createElement("meta");
      tag.setAttribute(attribute, name);
      tag.setAttribute("content", content);
      document.head.appendChild(tag);
    }
  }

  // Method to be called when language changes
  onLanguageChange(newLanguage) {
    this.updateSEOTags(newLanguage);
  }
}

// Initialize SEO Manager
document.addEventListener("DOMContentLoaded", function () {
  window.seoManager = new SEOManager();
  window.seoManager.init();
});
