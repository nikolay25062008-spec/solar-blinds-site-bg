// Newsletter System for Eclipse Solar Blinds
class NewsletterSystem {
  constructor() {
    this.subscribers = this.loadSubscribers();
    this.init();
  }

  init() {
    this.createNewsletterModal();
    this.addStyles();
    this.addEventListeners();
  }

  createNewsletterModal() {
    // Create newsletter button
    const newsletterBtn = document.createElement('button');
    newsletterBtn.id = 'newsletter-btn';
    newsletterBtn.className = 'newsletter-btn';
    newsletterBtn.innerHTML = 'Абонирай се за новини';
    newsletterBtn.onclick = () => this.showModal();

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'newsletter-modal';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Абониране за новини</h3>
            <button class="modal-close" onclick="newsletter.closeModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="newsletter-info">
              <h4>Бъди информиран!</h4>
              <p>Абонирай се за нашия newsletter, за да получаваш:</p>
              <ul>
                <li>Най-новите продукти и оферти</li>
                <li>Ексклузивни промоции</li>
                <li>Технически съвети и трикове</li>
                <li>Новини от соларната индустрия</li>
                <li>Специални оферти за празници</li>
              </ul>
            </div>
            <form id="newsletter-form">
              <div class="form-group">
                <label for="newsletter-name">Име</label>
                <input type="text" id="newsletter-name" required placeholder="Вашето име">
              </div>
              <div class="form-group">
                <label for="newsletter-email">Имейл</label>
                <input type="email" id="newsletter-email" required placeholder="your@email.com">
              </div>
              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" id="newsletter-terms" required>
                  <span class="checkmark"></span>
                  Приемам <a href="#" onclick="newsletter.showTerms()">общите условия</a> и <a href="#" onclick="newsletter.showPrivacy()">политиката за поверителност</a>
                </label>
              </div>
              <div class="form-group">
                <label class="checkbox-label">
                  <input type="checkbox" id="newsletter-marketing">
                  <span class="checkmark"></span>
                  Искам да получавам и маркетингови имейли
                </label>
              </div>
              <button type="submit" class="newsletter-submit-btn">
                <span class="btn-text">Абонирай се</span>
                <span class="btn-loading" style="display: none;">⏳ Изпращане...</span>
              </button>
            </form>
            <div class="newsletter-success" id="newsletter-success" style="display: none;">
              <div class="success-icon"></div>
              <h4>Успешна абонация!</h4>
              <p>Благодарим ви! Ще получавате най-новите новини на вашия имейл.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add to page
    document.body.appendChild(newsletterBtn);
    document.body.appendChild(modal);
  }

  addStyles() {
    const styles = `
      #newsletter-btn {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #0b81ff 0%, #1e40af 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(11, 129, 255, 0.3);
        z-index: 9999;
        transition: all 0.3s ease;
        white-space: nowrap;
      }

      #newsletter-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(11, 129, 255, 0.4);
      }

      #newsletter-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10003;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      #newsletter-modal.show {
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
        border-radius: 16px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }

      #newsletter-modal.show .modal-content {
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
        font-weight: 600;
      }

      .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
        width: 32px;
        height: 32px;
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

      .newsletter-info {
        margin-bottom: 24px;
        text-align: center;
      }

      .newsletter-info h4 {
        margin: 0 0 12px 0;
        color: #1a1a1a;
        font-size: 18px;
        font-weight: 600;
      }

      .newsletter-info p {
        margin: 0 0 16px 0;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.5;
      }

      .newsletter-info ul {
        text-align: left;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.6;
      }

      .newsletter-info li {
        margin-bottom: 8px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group label {
        display: block;
        margin-bottom: 8px;
        color: #374151;
        font-weight: 500;
        font-size: 14px;
      }

      .form-group input[type="text"],
      .form-group input[type="email"] {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        transition: border-color 0.3s ease;
      }

      .form-group input:focus {
        outline: none;
        border-color: #0b81ff;
        box-shadow: 0 0 0 3px rgba(11, 129, 255, 0.1);
      }

      .checkbox-group {
        margin-bottom: 16px;
      }

      .checkbox-label {
        display: flex;
        align-items: flex-start;
        cursor: pointer;
        font-size: 14px;
        line-height: 1.4;
        color: #374151;
      }

      .checkbox-label input[type="checkbox"] {
        display: none;
      }

      .checkmark {
        min-width: 20px;
        height: 20px;
        border: 2px solid #d1d5db;
        border-radius: 4px;
        margin-right: 12px;
        position: relative;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      .checkbox-label input:checked ~ .checkmark {
        background: #0b81ff;
        border-color: #0b81ff;
      }

      .checkbox-label input:checked ~ .checkmark:after {
        display: block;
      }

      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        left: 6px;
        top: 2px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      .newsletter-submit-btn {
        width: 100%;
        background: linear-gradient(135deg, #0b81ff 0%, #1e40af 100%);
        color: white;
        border: none;
        padding: 14px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }

      .newsletter-submit-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
        transform: translateY(-1px);
      }

      .newsletter-submit-btn:disabled {
        background: #94a3b8;
        cursor: not-allowed;
        transform: none;
      }

      .newsletter-success {
        text-align: center;
        padding: 32px 24px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        border-radius: 12px;
        margin-top: 16px;
      }

      .success-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }

      .newsletter-success h4 {
        margin: 0 0 8px 0;
        font-size: 20px;
        font-weight: 600;
      }

      .newsletter-success p {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
      }

      /* Responsive */
      @media (max-width: 768px) {
        #newsletter-btn {
          bottom: 15px;
          left: 15px;
          padding: 10px 16px;
          font-size: 13px;
        }

        .modal-content {
          margin: 20px;
        }

        .modal-header,
        .modal-body {
          padding: 20px;
        }

        .newsletter-info h4 {
          font-size: 16px;
        }

        .newsletter-info p,
        .newsletter-info ul {
          font-size: 13px;
        }
      }

      @media (max-width: 480px) {
        #newsletter-btn {
          bottom: 10px;
          left: 10px;
          padding: 8px 12px;
          font-size: 12px;
        }

        .modal-overlay {
          padding: 10px;
        }

        .modal-header,
        .modal-body {
          padding: 16px;
        }

        .newsletter-info ul {
          font-size: 12px;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  addEventListeners() {
    // Form submission
    const form = document.getElementById('newsletter-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubscribe();
      });
    }

    // Click outside modal to close
    const modal = document.getElementById('newsletter-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  showModal() {
    const modal = document.getElementById('newsletter-modal');
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    const modal = document.getElementById('newsletter-modal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  async handleSubscribe() {
    const name = document.getElementById('newsletter-name').value.trim();
    const email = document.getElementById('newsletter-email').value.trim();
    const acceptTerms = document.getElementById('newsletter-terms').checked;
    const acceptMarketing = document.getElementById('newsletter-marketing').checked;

    // Validation
    if (!name || !email) {
      this.showError('Моля попълнете име и имейл');
      return;
    }

    if (!this.validateEmail(email)) {
      this.showError('Моля въведете валиден имейл адрес');
      return;
    }

    if (!acceptTerms) {
      this.showError('Трябва да приемете общите условия и политиката за поверителност');
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    // Simulate API call
    await this.simulateAPICall({ name, email, acceptMarketing });

    // Save subscriber
    this.saveSubscriber({ name, email, acceptMarketing, date: new Date().toISOString() });

    // Show success
    this.showSuccess();
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async simulateAPICall(data) {
    // Simulate network delay
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, data });
      }, 1500);
    });
  }

  setLoadingState(loading) {
    const submitBtn = document.querySelector('.newsletter-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (loading) {
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
    } else {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  }

  showError(message) {
    this.setLoadingState(false);
    
    // Remove existing error
    const existingError = document.querySelector('.newsletter-error');
    if (existingError) {
      existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'newsletter-error';
    errorDiv.innerHTML = `
      <div class="error-icon">⚠️</div>
      <div class="error-message">${message}</div>
    `;

    const form = document.getElementById('newsletter-form');
    if (form) {
      form.parentNode.insertBefore(errorDiv, form);
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

  showSuccess() {
    this.setLoadingState(false);
    
    // Hide form and show success
    const form = document.getElementById('newsletter-form');
    const success = document.getElementById('newsletter-success');
    
    if (form) form.style.display = 'none';
    if (success) success.style.display = 'block';

    // Auto close after 3 seconds
    setTimeout(() => {
      this.closeModal();
      // Reset form
      if (form) {
        form.style.display = 'block';
        form.reset();
      }
      if (success) success.style.display = 'none';
    }, 3000);
  }

  saveSubscriber(subscriber) {
    this.subscribers.push(subscriber);
    localStorage.setItem('eclipse_newsletter_subscribers', JSON.stringify(this.subscribers));
  }

  loadSubscribers() {
    const stored = localStorage.getItem('eclipse_newsletter_subscribers');
    return stored ? JSON.parse(stored) : [];
  }

  showTerms() {
    this.closeModal();
    // Open terms in new tab
    window.open('terms.html', '_blank');
  }

  showPrivacy() {
    this.closeModal();
    // Open privacy in new tab
    window.open('privacy.html', '_blank');
  }

  // Public method to get subscriber count
  getSubscriberCount() {
    return this.subscribers.length;
  }

  // Public method to export subscribers
  exportSubscribers() {
    const dataStr = JSON.stringify(this.subscribers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
}

// Initialize newsletter system
let newsletter;
document.addEventListener('DOMContentLoaded', function() {
  newsletter = new NewsletterSystem();
  window.newsletter = newsletter;
});
