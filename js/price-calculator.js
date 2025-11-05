/* FranxVan Price Calculator - €50 per hour system */

const franxvanPricing = {
  hourlyRate: 50, // €50 per hour ex BTW
  minimumHours: 1, // 1 hour minimum charge
  btw: 0.21, // 21% VAT

  // Dutch cities with estimated travel times from Amsterdam (in hours)
  cities: {
    // Amsterdam and close suburbs
    amsterdam: { name: "Amsterdam", time: 0.5 },
    amstelveen: { name: "Amstelveen", time: 0.75 },
    diemen: { name: "Diemen", time: 0.75 },
    ouderkerk: { name: "Ouderkerk aan de Amstel", time: 1.0 },
    zaandam: { name: "Zaandam", time: 1.0 },
    purmerend: { name: "Purmerend", time: 1.0 },
    hoofddorp: { name: "Hoofddorp", time: 1.0 },
    aalsmeer: { name: "Aalsmeer", time: 1.0 },

    // Nearby cities (within 1-2 hours)
    haarlem: { name: "Haarlem", time: 1.25 },
    hilversum: { name: "Hilversum", time: 1.25 },
    utrecht: { name: "Utrecht", time: 1.5 },
    leiden: { name: "Leiden", time: 1.5 },
    alkmaar: { name: "Alkmaar", time: 1.5 },
    almere: { name: "Almere", time: 1.5 },
    "den-haag": { name: "Den Haag", time: 2.0 },
    rotterdam: { name: "Rotterdam", time: 2.0 },
    amersfoort: { name: "Amersfoort", time: 2.0 },

    // Major cities (2+ hours)
    eindhoven: { name: "Eindhoven", time: 2.5 },
    tilburg: { name: "Tilburg", time: 2.5 },
    groningen: { name: "Groningen", time: 3.0 },
    maastricht: { name: "Maastricht", time: 3.5 },
    enschede: { name: "Enschede", time: 3.0 },
    nijmegen: { name: "Nijmegen", time: 2.5 },
    breda: { name: "Breda", time: 2.25 },
    apeldoorn: { name: "Apeldoorn", time: 2.25 },
    arnhem: { name: "Arnhem", time: 2.5 },
    zwolle: { name: "Zwolle", time: 2.25 },
  },

  // Service types that affect time estimation
  serviceTypes: {
    "small-transport": {
      name: "Klein transport (pakketten, kleine items)",
      multiplier: 1.0,
    },
    furniture: { name: "Meubels en grote items", multiplier: 1.3 },
    moving: { name: "Verhuizing (gedeeltelijk)", multiplier: 1.8 },
    "full-moving": { name: "Complete verhuizing", multiplier: 2.5 },
    urgent: { name: "Spoedtransport", multiplier: 1.0 },
  },
};

class PriceCalculator {
  constructor() {
    this.currentLanguage = "nl";
    this.translations = {};
    this.initializeCalculator();
  }

  async initializeCalculator() {
    // Load translations
    await this.loadTranslations();

    // Find form elements
    this.fromSelect = document.getElementById("from-city");
    this.toSelect = document.getElementById("to-city");
    this.serviceSelect = document.getElementById("service-type"); // Optional
    this.calculateBtn = document.getElementById("calculate-btn"); // Optional
    this.resultDiv = document.getElementById("price-result");

    if (!this.fromSelect || !this.toSelect) {
      console.log("Price calculator form elements not found");
      return;
    }

    // Get current language from language system
    this.currentLanguage = localStorage.getItem("franxvan-language") || "nl";

    // Populate dropdowns
    this.populateDropdowns();

    // Add event listeners
    this.addEventListeners();

    console.log("FranxVan price calculator initialized");
  }

  async loadTranslations() {
    try {
      const response = await fetch("./data/translations.json");
      this.translations = await response.json();
    } catch (error) {
      console.error("Failed to load translations for price calculator:", error);
    }
  }

  populateDropdowns() {
    // Clear existing options (except the first placeholder)
    this.clearDropdownOptions();

    // Update placeholder text
    this.updatePlaceholderText();

    // Populate city dropdowns
    Object.keys(franxvanPricing.cities).forEach((cityKey) => {
      const city = franxvanPricing.cities[cityKey];

      // Add to 'from' dropdown
      const fromOption = document.createElement("option");
      fromOption.value = cityKey;
      fromOption.textContent = city.name;
      this.fromSelect.appendChild(fromOption);

      // Add to 'to' dropdown
      const toOption = document.createElement("option");
      toOption.value = cityKey;
      toOption.textContent = city.name;
      this.toSelect.appendChild(toOption);
    });

    // Populate service types only if element exists
    if (this.serviceSelect) {
      Object.keys(franxvanPricing.serviceTypes).forEach((serviceKey) => {
        const service = franxvanPricing.serviceTypes[serviceKey];
        const option = document.createElement("option");
        option.value = serviceKey;
        option.textContent = service.name;
        this.serviceSelect.appendChild(option);
      });
    }
  }

  clearDropdownOptions() {
    // Keep only the first option (placeholder) and remove the rest
    while (this.fromSelect.children.length > 1) {
      this.fromSelect.removeChild(this.fromSelect.lastChild);
    }
    while (this.toSelect.children.length > 1) {
      this.toSelect.removeChild(this.toSelect.lastChild);
    }
  }

  updatePlaceholderText() {
    // Safety check - only update if elements exist
    if (!this.fromSelect || !this.toSelect) {
      return;
    }

    if (
      this.translations[this.currentLanguage] &&
      this.translations[this.currentLanguage].form
    ) {
      const formTranslations = this.translations[this.currentLanguage].form;

      // Update placeholder options
      const fromPlaceholder = this.fromSelect.querySelector('option[value=""]');
      const toPlaceholder = this.toSelect.querySelector('option[value=""]');

      if (fromPlaceholder) {
        fromPlaceholder.textContent = formTranslations.selectCity;
      }
      if (toPlaceholder) {
        toPlaceholder.textContent = formTranslations.selectCity;
      }
    }
  }

  addEventListeners() {
    // Calculate on button click (if button exists)
    if (this.calculateBtn) {
      this.calculateBtn.addEventListener("click", () => {
        this.calculatePrice();
      });
    }

    // Auto-calculate when selections change
    const elementsToWatch = [this.fromSelect, this.toSelect];
    if (this.serviceSelect) {
      elementsToWatch.push(this.serviceSelect);
    }

    elementsToWatch.forEach((element) => {
      element.addEventListener("change", () => {
        if (this.fromSelect.value && this.toSelect.value) {
          this.calculatePrice();
        }
      });
    });
  }

  calculatePrice() {
    const fromCity = this.fromSelect.value;
    const toCity = this.toSelect.value;
    const serviceType =
      (this.serviceSelect && this.serviceSelect.value) || "small-transport"; // Default to small-transport

    if (!fromCity || !toCity) {
      const errorMsg =
        this.translations[this.currentLanguage]?.priceCalculator?.errors
          ?.selectLocations ||
        "Selecteer van en naar locatie om een prijsschatting te krijgen.";
      this.showResult(errorMsg);
      return;
    }

    if (fromCity === toCity) {
      const errorMsg =
        this.translations[this.currentLanguage]?.priceCalculator?.errors
          ?.sameLocation || "Van en naar locatie kunnen niet hetzelfde zijn.";
      this.showResult(errorMsg);
      return;
    }

    // Calculate estimated time
    const fromTime = franxvanPricing.cities[fromCity].time;
    const toTime = franxvanPricing.cities[toCity].time;
    const baseTime = Math.abs(toTime - fromTime) + 0.5; // Add 30min for loading/unloading

    // Apply service multiplier (defaults to small-transport if not selected)
    const serviceMultiplier =
      franxvanPricing.serviceTypes[serviceType].multiplier;
    const totalTime = Math.max(
      baseTime * serviceMultiplier,
      franxvanPricing.minimumHours
    );

    // Calculate prices
    const estimatedHours = Math.ceil(totalTime); // Round up to full hours only
    const priceExBTW = estimatedHours * franxvanPricing.hourlyRate;
    const btwAmount = priceExBTW * franxvanPricing.btw;
    const priceIncBTW = priceExBTW + btwAmount;

    // Show result
    const standardTransportText =
      this.translations[this.currentLanguage]?.priceCalculator?.result
        ?.standardTransport || "Standaard transport";

    this.showResult({
      fromCity: franxvanPricing.cities[fromCity].name,
      toCity: franxvanPricing.cities[toCity].name,
      serviceType:
        this.serviceSelect && this.serviceSelect.value
          ? franxvanPricing.serviceTypes[serviceType].name
          : standardTransportText,
      estimatedHours: estimatedHours,
      priceExBTW: priceExBTW,
      btwAmount: Math.round(btwAmount * 100) / 100,
      priceIncBTW: Math.round(priceIncBTW * 100) / 100,
    });
  }

  showResult(result) {
    if (typeof result === "string") {
      this.resultDiv.innerHTML = `<p class="error">${result}</p>`;
      return;
    }

    // Get translations for current language
    const t =
      this.translations[this.currentLanguage]?.priceCalculator?.result || {};

    // Fallback to Dutch if translations are missing
    const labels = {
      title: t.title || "Prijsschatting",
      from: t.from || "Van:",
      to: t.to || "Naar:",
      service: t.service || "Service:",
      estimatedTime: t.estimatedTime || "Geschatte tijd:",
      hours: t.hours || "uur",
      priceExVat: t.priceExVat || "Prijs ex BTW:",
      vat: t.vat || "BTW (21%):",
      totalIncVat: t.totalIncVat || "Totaal inc BTW:",
      disclaimer:
        t.disclaimer ||
        "Dit is een indicatieve prijsschatting. Voor een exacte offerte neem contact op.",
    };

    this.resultDiv.innerHTML = `
      <div class="price-breakdown">
        <p class="estimation-title">${labels.title}</p>
        <div class="route-info">
          <p><strong>${labels.from}</strong> ${result.fromCity}</p>
          <p><strong>${labels.to}</strong> ${result.toCity}</p>
          <p><strong>${labels.service}</strong> ${result.serviceType}</p>
        </div>
        <div class="price-info">
          <p><strong>${labels.estimatedTime}</strong> ${result.estimatedHours} ${labels.hours}</p>
          <p><strong>${labels.priceExVat}</strong> €${result.priceExBTW},-</p>
          <p><strong>${labels.vat}</strong> €${result.btwAmount}</p>
          </div>
        <div class="price-total">
            <p class="total-price"><strong>${labels.totalIncVat}</strong> €${result.priceIncBTW}</p>
            <p class="disclaimer"><em>${labels.disclaimer}</em></p>
        </div>
      </div>
    `;

    this.resultDiv.style.display = "block";
  }

  // Method to be called when language changes
  onLanguageChange(newLanguage) {
    this.currentLanguage = newLanguage;
    this.updatePlaceholderText();

    // Update any existing price result (only if resultDiv exists and is visible)
    if (this.resultDiv && this.resultDiv.style.display !== "none") {
      // Recalculate to show result in new language
      this.calculatePrice();
    }
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.priceCalculator = new PriceCalculator();
});
