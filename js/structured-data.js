/* Structured Data Manager - JSON-LD Schema for FranxVan */

class StructuredDataManager {
  constructor() {
    this.currentLanguage = "nl";
    this.translations = {};
    this.businessData = {
      name: "FranxVan",
      phone: "+31630600300",
      website: "https://www.franxvan.nl",
      email: "info@franxvan.nl", // Placeholder
      address: {
        streetAddress: "Amsterdam", // Placeholder - update with actual address
        addressLocality: "Amsterdam",
        addressRegion: "Noord-Holland",
        postalCode: "1000 AA", // Placeholder
        addressCountry: "NL",
      },
      serviceAreas: [
        "Amsterdam",
        "Amstelveen",
        "Diemen",
        "Zaandam",
        "Purmerend",
        "Hoofddorp",
        "Aalsmeer",
        "Haarlem",
        "Hilversum",
        "Utrecht",
        "Leiden",
        "Alkmaar",
        "Almere",
        "Den Haag",
        "Rotterdam",
        "Amersfoort",
        "Eindhoven",
        "Tilburg",
        "Groningen",
        "Maastricht",
      ],
      hourlyRate: 50,
      currency: "EUR",
    };
  }

  async init() {
    try {
      // Load translations
      const response = await fetch("./data/translations.json");
      this.translations = await response.json();

      // Get current language
      this.currentLanguage = localStorage.getItem("franxvan-language") || "nl";

      // Generate and inject structured data
      this.generateStructuredData();

      console.log("Structured Data Manager initialized");
    } catch (error) {
      console.error("Failed to initialize Structured Data Manager:", error);
    }
  }

  generateStructuredData() {
    const schemas = [
      this.createLocalBusinessSchema(),
      this.createOrganizationSchema(),
      this.createServicesSchema(),
      this.createWebsiteSchema(),
    ];

    // Remove existing structured data
    this.removeExistingSchemas();

    // Add new schemas
    schemas.forEach((schema) => {
      if (schema) {
        this.injectSchema(schema);
      }
    });
  }

  createLocalBusinessSchema() {
    const t = this.translations[this.currentLanguage];

    return {
      "@context": "https://schema.org",
      "@type": "MovingCompany",
      name: this.businessData.name,
      description:
        t?.seo?.description ||
        "Professional transport and moving services in Amsterdam",
      url: this.businessData.website,
      telephone: this.businessData.phone,
      email: this.businessData.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: this.businessData.address.streetAddress,
        addressLocality: this.businessData.address.addressLocality,
        addressRegion: this.businessData.address.addressRegion,
        postalCode: this.businessData.address.postalCode,
        addressCountry: this.businessData.address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "52.3676",
        longitude: "4.9041",
      },
      areaServed: this.businessData.serviceAreas.map((area) => ({
        "@type": "City",
        name: area,
        addressCountry: "NL",
      })),
      openingHours: "Mo-Su 00:00-23:59",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Bank transfer",
      logo: `${this.businessData.website}/images/logo.png`,
      image: `${this.businessData.website}/images/logo.png`,
      sameAs: [
        "https://www.facebook.com/FRANXVAN.NL",
        "https://www.instagram.com/franxvan",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "1",
        bestRating: "5",
        worstRating: "1",
      },
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Tevreden Klant",
        },
        reviewBody: "Uitstekende service, snel en betrouwbaar!",
      },
    };
  }

  createOrganizationSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: this.businessData.name,
      url: this.businessData.website,
      logo: `${this.businessData.website}/images/logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: this.businessData.phone,
        contactType: "customer service",
        availableLanguage: ["Dutch", "English"],
        areaServed: "NL",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: this.businessData.address.addressLocality,
        addressCountry: this.businessData.address.addressCountry,
      },
    };
  }

  createServicesSchema() {
    const t = this.translations[this.currentLanguage];
    const services = [];

    // Transport Service
    services.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: t?.services?.transport?.title || "Transport Service",
      description:
        t?.services?.transport?.description || "Reliable transport services",
      provider: {
        "@type": "MovingCompany",
        name: this.businessData.name,
        telephone: this.businessData.phone,
      },
      areaServed: this.businessData.serviceAreas,
      offers: {
        "@type": "Offer",
        price: this.businessData.hourlyRate,
        priceCurrency: this.businessData.currency,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: this.businessData.hourlyRate,
          priceCurrency: this.businessData.currency,
          unitText: "per hour",
        },
      },
    });

    // Roadside Assistance Service
    services.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: t?.services?.roadside?.title || "Roadside Assistance",
      description:
        t?.services?.roadside?.description || "24/7 roadside assistance",
      provider: {
        "@type": "MovingCompany",
        name: this.businessData.name,
        telephone: this.businessData.phone,
      },
      areaServed: this.businessData.serviceAreas,
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    });

    // Storage Service
    services.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: t?.services?.storage?.title || "Storage Service",
      description:
        t?.services?.storage?.description || "Temporary storage solutions",
      provider: {
        "@type": "MovingCompany",
        name: this.businessData.name,
        telephone: this.businessData.phone,
      },
      areaServed: this.businessData.serviceAreas,
    });

    return services;
  }

  createWebsiteSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: this.businessData.name,
      url: this.businessData.website,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${this.businessData.website}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  injectSchema(schema) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema, null, 2);
    script.className = "structured-data-schema";
    document.head.appendChild(script);
  }

  removeExistingSchemas() {
    const existingSchemas = document.querySelectorAll(
      ".structured-data-schema"
    );
    existingSchemas.forEach((schema) => schema.remove());
  }

  // Method to be called when language changes
  onLanguageChange(newLanguage) {
    this.currentLanguage = newLanguage;
    this.generateStructuredData();
  }
}

// Initialize structured data manager
document.addEventListener("DOMContentLoaded", function () {
  window.structuredDataManager = new StructuredDataManager();
  window.structuredDataManager.init();
});
