// Cookie Consent Banner
class CookieConsent {
  constructor() {
    this.hasConsent = this.getCookieConsent();
    this.init();
  }

  init() {
    if (!this.hasConsent) {
      this.createBanner();
      this.addStyles();
      this.addEventListeners();
    }
  }

  createBanner() {
    // Create blur overlay
    const blurOverlay = document.createElement('div');
    blurOverlay.id = 'cookie-blur-overlay';
    
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <div class="cookie-icon">🍪</div>
        <div class="cookie-text">
          <h4>Бисквитки</h4>
          <p>Използваме бисквитки, за да подобрим вашето изживяване и да анализираме трафика на сайта.</p>
        </div>
        <div class="cookie-buttons">
          <button class="cookie-btn accept" onclick="cookieConsent.acceptAll()">Приемам всички</button>
          <button class="cookie-btn settings" onclick="cookieConsent.showSettings()">Настройки</button>
          <button class="cookie-btn reject" onclick="cookieConsent.rejectAll()">Само необходими</button>
        </div>
      </div>
    `;

    // Add settings modal
    const settingsModal = document.createElement('div');
    settingsModal.id = 'cookie-settings-modal';
    settingsModal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Настройки за бисквитки</h3>
            <button class="modal-close" onclick="cookieConsent.closeSettings()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="cookie-category">
              <div class="category-header">
                <label class="toggle-switch">
                  <input type="checkbox" id="necessary-cookies" checked disabled>
                  <span class="slider"></span>
                </label>
                <div class="category-info">
                  <h4>Необходими бисквитки</h4>
                  <p>Задължителни за функционирането на сайта</p>
                </div>
              </div>
            </div>
            
            <div class="cookie-category">
              <div class="category-header">
                <label class="toggle-switch">
                  <input type="checkbox" id="analytics-cookies">
                  <span class="slider"></span>
                </label>
                <div class="category-info">
                  <h4>Аналитични бисквитки</h4>
                  <p>Помагат ни да разберем как използвате сайта</p>
                </div>
              </div>
            </div>
            
            <div class="cookie-category">
              <div class="category-header">
                <label class="toggle-switch">
                  <input type="checkbox" id="marketing-cookies">
                  <span class="slider"></span>
                </label>
                <div class="category-info">
                  <h4>Маркетингови бисквитки</h4>
                  <p>Използват се за персонализирани реклами</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="cookie-btn reject" onclick="cookieConsent.saveSettings()">Запази настройки</button>
            <button class="cookie-btn accept" onclick="cookieConsent.acceptAllFromSettings()">Приеми всички</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(blurOverlay);
    document.body.appendChild(banner);
    document.body.appendChild(settingsModal);
  }

  addStyles() {
    const styles = `
      #cookie-blur-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
      }

      #cookie-blur-overlay.show {
        opacity: 1;
      }

      #cookie-consent-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        color: white;
        padding: 30px;
        z-index: 10001;
        box-shadow: 0 -8px 30px rgba(0,0,0,0.2);
        transform: translateY(100%);
        transition: transform 0.5s ease;
        min-height: 200px;
      }

      #cookie-consent-banner.show {
        transform: translateY(0);
      }

      .cookie-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
      }

      .cookie-icon {
        font-size: 32px;
        flex-shrink: 0;
        margin-right: 8px;
      }

      .cookie-text {
        flex: 1;
        min-width: 200px;
      }

      .cookie-text h4 {
        margin: 0 0 12px 0;
        font-size: 20px;
        font-weight: 600;
      }

      .cookie-text p {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        opacity: 0.9;
      }

      .cookie-buttons {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
      }

      .cookie-btn {
        padding: 14px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        white-space: nowrap;
      }

      .cookie-btn.accept {
        background: #0b81ff;
        color: white;
      }

      .cookie-btn.accept:hover {
        background: #1e40af;
        transform: translateY(-1px);
      }

      .cookie-btn.settings {
        background: transparent;
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
      }

      .cookie-btn.settings:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.5);
      }

      .cookie-btn.reject {
        background: transparent;
        color: white;
        border: 1px solid rgba(255,255,255,0.1);
      }

      .cookie-btn.reject:hover {
        background: rgba(255,255,255,0.05);
        border-color: rgba(255,255,255,0.3);
      }

      /* Settings Modal */
      #cookie-settings-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      #cookie-settings-modal.show {
        display: flex;
        opacity: 1;
      }

      .modal-overlay {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }

      #cookie-settings-modal.show .modal-content {
        transform: scale(1);
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        border-bottom: 1px solid #e2e8f0;
      }

      .modal-header h3 {
        margin: 0;
        color: #1a1a1a;
        font-size: 20px;
      }

      .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
      }

      .modal-close:hover {
        background: #f3f4f6;
        color: #1a1a1a;
      }

      .modal-body {
        padding: 24px;
      }

      .cookie-category {
        margin-bottom: 24px;
      }

      .category-header {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .category-info {
        flex: 1;
      }

      .category-info h4 {
        margin: 0 0 4px 0;
        color: #1a1a1a;
        font-size: 16px;
      }

      .category-info p {
        margin: 0;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.4;
      }

      /* Toggle Switch */
      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 26px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 26px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }

      input:checked + .slider {
        background-color: #0b81ff;
      }

      input:disabled + .slider {
        background-color: #94a3b8;
        cursor: not-allowed;
      }

      input:checked + .slider:before {
        transform: translateX(24px);
      }

      .modal-footer {
        padding: 24px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      /* Responsive */
      @media (max-width: 768px) {
        #cookie-consent-banner {
          padding: 24px;
          min-height: 180px;
        }

        .cookie-content {
          flex-direction: column;
          text-align: center;
          gap: 20px;
        }

        .cookie-icon {
          font-size: 28px;
          margin-right: 0;
          margin-bottom: 8px;
        }

        .cookie-text h4 {
          font-size: 18px;
        }

        .cookie-text p {
          font-size: 15px;
        }

        .cookie-buttons {
          justify-content: center;
          width: 100%;
        }

        .cookie-btn {
          flex: 1;
          min-width: 140px;
          font-size: 15px;
        }
      }

      @media (max-width: 480px) {
        #cookie-consent-banner {
          padding: 20px;
          min-height: 160px;
        }

        .cookie-icon {
          font-size: 24px;
        }

        .cookie-text h4 {
          font-size: 16px;
        }

        .cookie-text p {
          font-size: 14px;
        }

        .cookie-btn {
          padding: 12px 20px;
          font-size: 14px;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  addEventListeners() {
    // Show banner with delay
    setTimeout(() => {
      const banner = document.getElementById('cookie-consent-banner');
      const blurOverlay = document.getElementById('cookie-blur-overlay');
      if (banner && blurOverlay) {
        banner.classList.add('show');
        blurOverlay.classList.add('show');
      }
    }, 1000);
  }

  acceptAll() {
    this.setCookieConsent({
      necessary: true,
      analytics: true,
      marketing: true
    });
    this.hideBanner();
    this.loadScripts('all');
  }

  rejectAll() {
    this.setCookieConsent({
      necessary: true,
      analytics: false,
      marketing: false
    });
    this.hideBanner();
    this.loadScripts('necessary');
  }

  showSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
      modal.classList.add('show');
      // Load current settings
      const consent = this.getCookieConsent();
      if (consent) {
        document.getElementById('analytics-cookies').checked = consent.analytics || false;
        document.getElementById('marketing-cookies').checked = consent.marketing || false;
      }
    }
  }

  closeSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
      modal.classList.remove('show');
    }
  }

  saveSettings() {
    const consent = {
      necessary: true,
      analytics: document.getElementById('analytics-cookies').checked,
      marketing: document.getElementById('marketing-cookies').checked
    };
    
    this.setCookieConsent(consent);
    this.hideBanner();
    this.closeSettings();
    this.loadScripts(consent.analytics ? 'analytics' : 'necessary');
  }

  acceptAllFromSettings() {
    this.acceptAll();
    this.closeSettings();
  }

  hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    const blurOverlay = document.getElementById('cookie-blur-overlay');
    
    if (banner) {
      banner.classList.remove('show');
    }
    
    if (blurOverlay) {
      blurOverlay.classList.remove('show');
    }
    
    setTimeout(() => {
      if (banner) banner.remove();
      if (blurOverlay) blurOverlay.remove();
    }, 500);
  }

  setCookieConsent(consent) {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    this.hasConsent = consent;
  }

  getCookieConsent() {
    const stored = localStorage.getItem('cookie-consent');
    return stored ? JSON.parse(stored) : null;
  }

  loadScripts(type) {
    // Load scripts based on consent
    if (type === 'all' || type === 'analytics') {
      // Load Google Analytics
      this.loadGoogleAnalytics();
    }
    
    if (type === 'all' || type === 'marketing') {
      // Load Facebook Pixel
      this.loadFacebookPixel();
    }
  }

  loadGoogleAnalytics() {
    // Example Google Analytics loading
    console.log('Loading Google Analytics...');
    // In production, add actual GA script here
  }

  loadFacebookPixel() {
    // Example Facebook Pixel loading
    console.log('Loading Facebook Pixel...');
    // In production, add actual Pixel script here
  }
}

// Initialize cookie consent
let cookieConsent;
document.addEventListener('DOMContentLoaded', function() {
  cookieConsent = new CookieConsent();
  window.cookieConsent = cookieConsent;
});
