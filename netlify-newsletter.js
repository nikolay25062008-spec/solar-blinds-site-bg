// Netlify Forms Integration for Eclipse Solar Blinds Newsletter
class NetlifyNewsletterIntegration {
  constructor() {
    this.netlifyUrl = 'https://eclipse-solar-blinds.netlify.app';
    this.init();
  }

  init() {
    this.updateNewsletterForm();
    this.addNetlifyStyles();
    this.addNetlifyEventListeners();
  }

  updateNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (form) {
      // Update form to work with Netlify
      form.setAttribute('name', 'newsletter');
      form.setAttribute('method', 'POST');
      form.setAttribute('data-netlify', 'true');
      
      // Add Netlify hidden input
      const netlifyInput = document.createElement('input');
      netlifyInput.type = 'hidden';
      netlifyInput.name = 'form-name';
      netlifyInput.value = 'newsletter';
      form.appendChild(netlifyInput);
    }
  }

  addNetlifyStyles() {
    const styles = `
      /* Netlify Forms Specific Styles */
      .newsletter-form[data-netlify="true"] {
        position: relative;
      }

      .newsletter-form[data-netlify="true"]::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(11, 129, 255, 0.05);
        border-radius: 8px;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 1;
      }

      .newsletter-form[data-netlify="true"].submitting::before {
        opacity: 1;
        pointer-events: all;
      }

      .newsletter-form[data-netlify="true"].success::before {
        background: rgba(16, 185, 129, 0.1);
        opacity: 1;
      }

      .newsletter-form[data-netlify="true"].error::before {
        background: rgba(239, 68, 68, 0.1);
        opacity: 1;
      }

      /* Enhanced button styles */
      .newsletter-submit-btn {
        position: relative;
        overflow: hidden;
      }

      .newsletter-submit-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
      }

      .newsletter-form[data-netlify="true"].submitting .newsletter-submit-btn::before {
        width: 300px;
        height: 300px;
      }

      /* Success message enhancement */
      .newsletter-success {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border: 2px solid #10b981;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
        position: relative;
        overflow: hidden;
      }

      .newsletter-success::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        animation: successPulse 2s ease-out;
      }

      @keyframes successPulse {
        0% {
          transform: scale(0.8) rotate(0deg);
          opacity: 0;
        }
        50% {
          transform: scale(1.1) rotate(180deg);
          opacity: 1;
        }
        100% {
          transform: scale(1) rotate(360deg);
          opacity: 0;
        }
      }

      /* Loading states */
      .newsletter-form[data-netlify="true"].submitting .newsletter-submit-btn {
        background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
        cursor: wait;
      }

      .newsletter-form[data-netlify="true"].submitting .btn-text {
        opacity: 0.7;
      }

      .newsletter-form[data-netlify="true"].submitting .btn-loading {
        display: inline;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* Error states */
      .newsletter-form[data-netlify="true"].error .newsletter-submit-btn {
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        animation: shake 0.5s ease-in-out;
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }

      /* Enhanced form inputs */
      .form-group input:focus {
        border-color: #0b81ff;
        box-shadow: 0 0 0 3px rgba(11, 129, 255, 0.1);
        transform: translateY(-1px);
      }

      /* Netlify branding */
      .netlify-powered {
        text-align: center;
        margin-top: 16px;
        padding: 12px;
        background: rgba(11, 129, 255, 0.05);
        border-radius: 8px;
        font-size: 12px;
        color: #6b7280;
      }

      .netlify-powered a {
        color: #0b81ff;
        text-decoration: none;
        font-weight: 500;
      }

      .netlify-powered a:hover {
        text-decoration: underline;
      }

      /* Responsive improvements */
      @media (max-width: 768px) {
        .newsletter-form[data-netlify="true"].submitting .newsletter-submit-btn::before {
          width: 250px;
          height: 250px;
        }
      }

      @media (max-width: 480px) {
        .newsletter-form[data-netlify="true"].submitting .newsletter-submit-btn::before {
          width: 200px;
          height: 200px;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  addNetlifyEventListeners() {
    const form = document.getElementById('newsletter-form');
    if (form) {
      // Handle form submission with Netlify
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNetlifySubmission(form);
      });

      // Add real-time validation
      const inputs = form.querySelectorAll('input[required]');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateInput(input);
        });
        
        input.addEventListener('input', () => {
          this.clearInputError(input);
        });
      });
    }
  }

  async handleNetlifySubmission(form) {
    const name = document.getElementById('newsletter-name').value.trim();
    const email = document.getElementById('newsletter-email').value.trim();
    const acceptTerms = document.getElementById('newsletter-terms').checked;
    const acceptMarketing = document.getElementById('newsletter-marketing').checked;

    // Client-side validation
    if (!this.validateForm(name, email, acceptTerms)) {
      return;
    }

    // Set loading state
    this.setFormState(form, 'submitting');

    try {
      // Submit to Netlify
      const response = await fetch(this.netlifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: new URLSearchParams({
          'form-name': 'newsletter',
          name: name,
          email: email,
          'newsletter-terms': acceptTerms ? 'on' : 'off',
          'newsletter-marketing': acceptMarketing ? 'on' : 'off',
        }).toString(),
      });

      if (response.ok) {
        this.setFormState(form, 'success');
        this.showNetlifySuccess(name, email);
        
        // Save to localStorage as backup
        this.saveSubscriber({
          name,
          email,
          acceptMarketing,
          date: new Date().toISOString(),
          source: 'netlify'
        });

        // Reset form after delay
        setTimeout(() => {
          this.resetForm(form);
        }, 3000);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      this.setFormState(form, 'error');
      this.showNetlifyError(error.message);
    }
  }

  validateForm(name, email, acceptTerms) {
    let isValid = true;
    let errorMessage = '';

    if (!name || name.length < 2) {
      isValid = false;
      errorMessage = 'Моля въведете валидно име (поне 2 символа)';
    }

    if (!this.validateEmail(email)) {
      isValid = false;
      errorMessage = 'Моля въведете валиден имейл адрес';
    }

    if (!acceptTerms) {
      isValid = false;
      errorMessage = 'Трябва да приемете общите условия и политиката за поверителност';
    }

    if (!isValid) {
      this.showNetlifyError(errorMessage);
      return false;
    }

    return true;
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validateInput(input) {
    if (input.value.trim() === '') {
      input.style.borderColor = '#dc2626';
    } else if (input.type === 'email' && !this.validateEmail(input.value)) {
      input.style.borderColor = '#dc2626';
    } else {
      input.style.borderColor = '#10b981';
    }
  }

  clearInputError(input) {
    input.style.borderColor = '#e2e8f0';
  }

  setFormState(form, state) {
    form.className = `newsletter-form ${state}`;
    form.setAttribute('data-netlify', 'true');
  }

  resetForm(form) {
    form.reset();
    this.setFormState(form, '');
    this.clearInputError(document.getElementById('newsletter-name'));
    this.clearInputError(document.getElementById('newsletter-email'));
  }

  showNetlifySuccess(name, email) {
    const successDiv = document.getElementById('newsletter-success');
    if (successDiv) {
      successDiv.innerHTML = `
        <div class="success-content">
          <div class="success-icon"></div>
          <h4>Успешна абонация!</h4>
          <p>Благодарим ви, ${name}!</p>
          <p>Потвърдихме абонамента на имейл: <strong>${email}</strong></p>
          <p>Ще получавате най-новите новини и ексклузивни оферти директно във вашата поща.</p>
          <div class="netlify-powered">
            <small>Powered by <a href="https://www.netlify.com/products/forms/" target="_blank" rel="noopener">Netlify Forms</a></small>
          </div>
        </div>
      `;
      successDiv.style.display = 'block';
    }
  }

  showNetlifyError(message) {
    // Remove existing error
    const existingError = document.querySelector('.netlify-error');
    if (existingError) {
      existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'netlify-error';
    errorDiv.innerHTML = `
      <div class="error-content">
        <div class="error-icon">⚠️</div>
        <div class="error-message">${message}</div>
        <p>Моля опитайте отново или се свържете с нас на: <a href="mailto:eclipsesolarblinds@gmail.com">eclipsesolarblinds@gmail.com</a></p>
      </div>
    `;

    const form = document.getElementById('newsletter-form');
    if (form) {
      form.parentNode.insertBefore(errorDiv, form);
    }

    // Auto remove after 8 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 8000);
  }

  saveSubscriber(subscriber) {
    // Load existing subscribers
    const subscribers = this.loadSubscribers();
    subscribers.push(subscriber);
    localStorage.setItem('eclipse_newsletter_subscribers', JSON.stringify(subscribers));
  }

  loadSubscribers() {
    const stored = localStorage.getItem('eclipse_newsletter_subscribers');
    return stored ? JSON.parse(stored) : [];
  }

  // Public methods
  getSubscriberCount() {
    return this.loadSubscribers().length;
  }

  exportSubscribers() {
    const subscribers = this.loadSubscribers();
    const dataStr = JSON.stringify(subscribers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
}

// Initialize Netlify newsletter integration
let netlifyNewsletter;
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on Netlify
  if (window.location.hostname.includes('netlify') || window.location.hostname === 'localhost') {
    netlifyNewsletter = new NetlifyNewsletterIntegration();
    window.netlifyNewsletter = netlifyNewsletter;
  }
});
