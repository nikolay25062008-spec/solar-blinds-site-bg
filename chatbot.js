// AI Live Chat System for Eclipse Solar Blinds
class EclipseChatBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isTyping = false;
    this.init();
  }

  init() {
    this.createChatWidget();
    this.addEventListeners();
    this.loadChatHistory();
  }

  createChatWidget() {
    // Chat button
    const chatButton = document.createElement('div');
    chatButton.id = 'eclipse-chat-button';
    chatButton.innerHTML = `
      <div class="chat-icon">💬</div>
      <div class="chat-label">Помощ</div>
    `;
    document.body.appendChild(chatButton);

    // Chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'eclipse-chat-window';
    chatWindow.innerHTML = `
      <div class="chat-header">
        <div class="chat-title">
          <div class="chat-avatar">AI</div>
          <div>
            <div class="chat-name">Eclipse AI Асистент</div>
            <div class="chat-status">Винаги онлайн</div>
          </div>
        </div>
        <button class="chat-close">×</button>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="message bot">
          <div class="message-avatar">AI</div>
          <div class="message-content">
            <div class="message-text">Здравейте! Аз съм AI асистентът на Eclipse Solar Blinds. Мога да ви помогна с:</div>
            <ul class="quick-answers">
              <li onclick="chatBot.sendQuickAnswer('Как работят соларните щори?')">🔋 Как работят соларните щори?</li>
              <li onclick="chatBot.sendQuickAnswer('Какви модели предлагате?')">🏠 Какви модели предлагате?</li>
              <li onclick="chatBot.sendQuickAnswer('Колко струват?')">💰 Колко струват?</li>
              <li onclick="chatBot.sendQuickAnswer('Как да поръчам?')">📦 Как да поръчам?</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="chat-input-container">
        <div class="chat-input-wrapper">
          <input type="text" id="chat-input" placeholder="Напишете вашето съобщение..." maxlength="500">
          <button id="chat-send" disabled>➤</button>
        </div>
        <div class="chat-suggestions">
          <span onclick="chatBot.sendQuickAnswer('Гаранция')">Гаранция</span>
          <span onclick="chatBot.sendQuickAnswer('Монтаж')">Монтаж</span>
          <span onclick="chatBot.sendQuickAnswer('Контакти')">Контакти</span>
        </div>
      </div>
    `;
    document.body.appendChild(chatWindow);

    // Add styles
    this.addStyles();
  }

  addStyles() {
    const styles = `
      #eclipse-chat-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #0b81ff 0%, #1e40af 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 20px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(11, 129, 255, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        transition: all 0.3s ease;
        animation: chatPulse 2s ease infinite;
      }

      @keyframes chatPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      #eclipse-chat-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px rgba(11, 129, 255, 0.4);
        animation: none;
      }

      .chat-icon {
        font-size: 20px;
      }

      .chat-label {
        font-size: 14px;
        font-weight: 600;
      }

      #eclipse-chat-window {
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 380px;
        height: 600px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        z-index: 10000;
        display: none;
        flex-direction: column;
        overflow: hidden;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .chat-header {
        background: linear-gradient(135deg, #0b81ff 0%, #1e40af 100%);
        color: white;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .chat-title {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .chat-avatar {
        width: 40px;
        height: 40px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }

      .chat-name {
        font-weight: 600;
        font-size: 16px;
      }

      .chat-status {
        font-size: 12px;
        opacity: 0.8;
        margin-top: 2px;
      }

      .chat-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
      }

      .chat-close:hover {
        background: rgba(255,255,255,0.1);
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #f8fafc;
      }

      .message {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
        animation: messageSlide 0.3s ease;
      }

      @keyframes messageSlide {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      .message.user {
        flex-direction: row-reverse;
      }

      .message-avatar {
        width: 32px;
        height: 32px;
        background: #e2e8f0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex-shrink: 0;
      }

      .message.user .message-avatar {
        background: #0b81ff;
        color: white;
      }

      .message-content {
        max-width: 70%;
      }

      .message-text {
        background: white;
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.4;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }

      .message.user .message-text {
        background: #0b81ff;
        color: white;
      }

      .message-time {
        font-size: 11px;
        color: #94a3b8;
        margin-top: 4px;
        text-align: right;
      }

      .message.user .message-time {
        text-align: left;
      }

      .quick-answers {
        margin-top: 12px;
        list-style: none;
        padding: 0;
      }

      .quick-answers li {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 10px 14px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 13px;
        line-height: 1.3;
      }

      .quick-answers li:hover {
        background: #0b81ff;
        color: white;
        border-color: #0b81ff;
        transform: translateX(4px);
      }

      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
        background: white;
        border-radius: 18px;
        width: fit-content;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }

      .typing-dot {
        width: 8px;
        height: 8px;
        background: #94a3b8;
        border-radius: 50%;
        animation: typing 1.4s ease infinite;
      }

      .typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .typing-dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
      }

      .chat-input-container {
        padding: 20px;
        background: white;
        border-top: 1px solid #e2e8f0;
      }

      .chat-input-wrapper {
        display: flex;
        gap: 10px;
        margin-bottom: 12px;
      }

      #chat-input {
        flex: 1;
        border: 1px solid #e2e8f0;
        border-radius: 25px;
        padding: 12px 20px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.3s ease;
      }

      #chat-input:focus {
        border-color: #0b81ff;
      }

      #chat-send {
        background: #0b81ff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #chat-send:hover:not(:disabled) {
        background: #1e40af;
        transform: scale(1.1);
      }

      #chat-send:disabled {
        background: #94a3b8;
        cursor: not-allowed;
      }

      .chat-suggestions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .chat-suggestions span {
        background: #f1f5f9;
        color: #475569;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #e2e8f0;
      }

      .chat-suggestions span:hover {
        background: #0b81ff;
        color: white;
        border-color: #0b81ff;
      }

      @media (max-width: 480px) {
        #eclipse-chat-button {
          bottom: 100px;
          right: 20px;
        }

        #eclipse-chat-window {
          width: calc(100% - 20px);
          right: 10px;
          bottom: 160px;
          height: 500px;
        }

        .chat-label {
          display: none;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  addEventListeners() {
    const chatButton = document.getElementById('eclipse-chat-button');
    const chatWindow = document.getElementById('eclipse-chat-window');
    const chatClose = chatWindow.querySelector('.chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    chatButton.addEventListener('click', () => this.toggleChat());
    chatClose.addEventListener('click', () => this.closeChat());
    
    chatInput.addEventListener('input', () => {
      chatSend.disabled = !chatInput.value.trim();
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    chatSend.addEventListener('click', () => this.sendMessage());
  }

  toggleChat() {
    const chatWindow = document.getElementById('eclipse-chat-window');
    const chatButton = document.getElementById('eclipse-chat-button');
    
    if (this.isOpen) {
      this.closeChat();
    } else {
      chatWindow.style.display = 'flex';
      chatButton.style.display = 'none';
      this.isOpen = true;
      this.focusInput();
    }
  }

  closeChat() {
    const chatWindow = document.getElementById('eclipse-chat-window');
    const chatButton = document.getElementById('eclipse-chat-button');
    
    chatWindow.style.display = 'none';
    chatButton.style.display = 'flex';
    this.isOpen = false;
  }

  focusInput() {
    setTimeout(() => {
      document.getElementById('chat-input').focus();
    }, 300);
  }

  sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    this.addMessage(message, 'user');
    input.value = '';
    document.getElementById('chat-send').disabled = true;

    // Show typing indicator
    this.showTyping();

    // Simulate AI response
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateAIResponse(message);
      this.addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
  }

  sendQuickAnswer(question) {
    this.addMessage(question, 'user');
    this.showTyping();

    setTimeout(() => {
      this.hideTyping();
      const response = this.generateAIResponse(question);
      this.addMessage(response, 'bot');
    }, 800 + Math.random() * 800);
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const time = new Date().toLocaleTimeString('bg-BG', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const avatar = sender === 'user' ? '👤' : 'AI';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <div class="message-text">${text}</div>
        <div class="message-time">${time}</div>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Save to localStorage
    this.saveChatHistory();
  }

  showTyping() {
    if (this.isTyping) return;
    
    this.isTyping = true;
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTyping() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced keyword matching with more context
    const responses = {
      // Product questions
      'как работят': 'Соларните щори имат вградени фотоволтаични панели, които преобразуват слънчевата светлина в електроенергия. Те осигуряват сянка и едновременно с това произвеждат ток, който може да се използва за захранване на уреди в дома ви. Системата включва инвертор и батерии за съхранение на излишната енергия.',
      
      'модели': 'Предлагаме 4 основни модела: 1) Соларен навес (180W/m²) за тераси и двор - най-мощен вариант, 2) Външни ролетни щори (150W/m²) - устойчиви на време, 3) Вътрешни хоризонтални щори (80W/m²) - класически дизайн, 4) Вътрешни вертикални щори (100W/m²) - за големи прозорци. Всеки модел има различна мощност и приложение.',
      
      'цена': 'Цените варират според модела и размерите. Започват от около 300лв/м² за соларен навес до 650лв/м² за външни ролетни щори. Препоръчвам да използвате нашия калкулатор за точна оферта на страницата "Поръчка". Цената включва монтаж и 5 години гаранция.',
      
      'колко струват': 'Цените варират според модела и размерите. Започват от около 300лв/м² за соларен навес до 650лв/м² за външни ролетни щори. Препоръчвам да използвате нашия калкулатор за точна оферта на страницата "Поръчка".',
      
      'поръчам': 'Можете да поръчате чрез нашия онлайн калкулатор на страницата "Поръчка" или като се свържете директно с нас на тел: +359 98 822 6863. Процесът включва: 1) Безплатен оглед и измерване, 2) Избор на модел и размери, 3) Сключване на договор, 4) Монтаж в рамките на 1-2 седмици.',
      
      'поръчка': 'Можете да поръчате чрез нашия онлайн калкулатор на страницата "Поръчка" или като се свържете директно с нас на тел: +359 98 822 6863. Процесът включва: 1) Безплатен оглед и измерване, 2) Избор на модел и размери, 3) Сключване на договор, 4) Монтаж в рамките на 1-2 седмици.',
      
      // Technical questions
      'гарантия': 'Всички наши продукти идват с 5 години гаранция за материалите и изработката. Гаранцията покрива дефекти в материалите и изработката, но не покрива механични повреди от неправилна употреба. Допълнително предлагаме сервизно обслужване през целия период на експлоатация.',
      
      'монтаж': 'Монтажът се извършва от нашите сертифицирани техници. Процесът отнема 1-2 дни в зависимост от обема на проекта. Включва: подготовка на повърхности, монтаж на щорите, електрическо свързване, тестване и инструктаж. Монтажът е включен в цената.',
      
      'енергия': 'Една квадратна метър соларни щори може да произведе до 180W пикова мощност. При средно 4-5 часа слънце на ден, това означава около 0.7-0.9kWh на ден от м². Годишно това може да спести до 300-400kWh на м², в зависимост от ориентацията и местоположението.',
      
      'спестяване': 'Според нашите изчисления, можете да спестите между 20-30% от месечната си сметка за електроенергия. При средна консумация от 300kWh месечно, това означава спестяване от 60-90kWh, или около 30-45лв месечно. Период на възвръщаемост: 5-7 години.',
      
      'мощност': 'Мощността варира по модели: Соларен навес - 180W/m², Външни ролетни - 150W/m², Вътрешни вертикални - 100W/m², Вътрешни хоризонтални - 80W/m². За стандартен балкон от 5м², соларният навес може да произведе до 900W пикова мощност.',
      
      // Contact and service
      'контакти': 'Можете да се свържете с нас на: 📧 eclipsesolarblinds@gmail.com или 📱 +359 98 822 6863 (Николай). Работим в цялата страна. Офисът ни е в София, но правим огледи и монтаж навсякъде в България.',
      
      'софия': 'Офисът ни е в София, но работим в цялата страна. Можем да направим оглед и монтаж навсякъде в България. За оглед извън София се уговаря отделно време.',
      
      'оглед': 'Предлагаме безплатен оглед и консултация. Наш специалист ще дойде на място, ще измери прозорците/терасата, ще оцени ориентацията и ще направи персонализирана оферта. Огледът е безплатен и без ангажимент.',
      
      // Product specifics
      'навес': 'Соларният навес е най-мощният ни продукт - 180W/m². Подходящ е за тераси, дворове и паркинги. Освен сянка, произвежда най-много енергия. Цени от 300лв/м². Може да се монтира на съществуваща конструкция или да се изгради нова.',
      
      'ролетни': 'Външните ролетни щори са много издръжливи - 150W/m². Подходящи за фасади и балкони. Защитават от дъжд, вятърн и прекомерна слънчева радиация. Цени от 650лв/м² включват монтаж.',
      
      'хоризонтални': 'Вътрешните хоризонтални щори са класически дизайн - 80W/m². Подходящи за офиси и дома. Лесни за поддръжка и елегантен външен вид. Цени от 400лв/м².',
      
      'вертикални': 'Вътрешните вертикални щори са идеални за големи прозорци и витрини - 100W/m². Модерен дизайн и добра производителност. Цени от 500лв/м².',
      
      // Business questions
      'доставка': 'Доставката и монтажа са включени в цената за цяла България. Срокове: 2-4 седмици от поръчката, в зависимост от натовареността и наличностите.',
      
      'срокове': 'Стандартните срокове за доставка и монтаж са 2-4 седмици. При по-големи проекти може да отнеме до 6 седмици. Винаги се стремим да спазим договорените срокове.',
      
      'плащане': 'Приемаме плащане по банков път, в брой при монтаж или на изплащане. Предлагаме и различни варианти за финансиране при по-големи проекти.',
      
      // General questions
      'какво е': 'Eclipse Solar Blinds е иновативна компания, която предлага соларни щори и навеси. Те са щори с вградени соларни панели, които едновременно осигуряват сянка и произвеждат електроенергия. Това е ученически проект на ученици от СПГЕ "Джон Атанасов".',
      
      'къе сте': 'Ние сме Eclipse Solar Blinds - екип от ученици от Софийска професионална гимназия по електроника "Джон Атанасов". Спечелихме второ място в PandaLabs Masterclass програмата на WWF България.',
      
      'проект': 'Това е ученически проект, създаден с образователна цел. Информацията не представлява реална търговска оферта. Проектът демонстрира иновативни решения за енергийна ефективност.',
      
      // Installation and maintenance
      'поддръжка': 'Предлагаме пълна сервизна поддръжка. Редовната поддръжка включва почистване на панелите, проверка на електрическите връзки и сервиз на батериите. Годишната поддръжка е около 50лв.',
      
      'изисквания': 'За монтаж са нужни: достъп до мястото, стандартно електрозахранване (220V), и пространство за инвертора и батериите. Няма специални изисквания за сградата.',
      
      // Weather and performance
      'дъжд': 'Външните щори са напълно водоустойчиви и могат да работят при дъжд. Вътрешните щори са защитени от дъжд, тъй като са вътре в помещението.',
      
      'зима': 'Соларните панели работят и през зимата, макар и с по-ниска ефективност. Снегът не поврежда панелите, а може дори да помогне като отразява допълнителна светлина.',
      
      'вятър': 'Външните щори са проектирани да издържат на силен вятър. Тествани са при скорости до 120км/ч. Вътрешните щори не са засегнати от вятъра.',
      
      // Comparison and benefits
      'предимства': 'Основните предимства са: 1) Двойна функция - сянка + енергия, 2) Спестяване на ток (20-30%), 3) Екологично решение, 4) Модерен дизайн, 5) 5 години гаранция, 6) Повишаване стойността на имота.',
      
      'разлика': 'Основната разлика с обикновените щори е, че нашите произвеждат електроенергия. Докато обикновените щори само блокират светлината, нашите я преобразуват в полезна енергия.',
      
      // Financial
      'възвръщаемост': 'Периодът на възвръщаемост е 5-7 години, в зависимост от инсталираната мощност и текущите цени на електроенергия. След този период, системата генерира чиста печалба.',
      
      'доход': 'При средни условия, 10м² соларни щори могат да генерират около 800-1000kWh годишно, което при текущи цени означава около 160-200лв годишно "доход" от спестени разходи.'
    };

    // Check for exact matches first
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Advanced pattern matching
    if (lowerMessage.includes('интересно') || lowerMessage.includes('разкажи')) {
      return 'Eclipse Solar Blinds е иновативно решение, което комбинира традиционни щори със соларна технология. Това позволява не само да се осигури комфортна сянка, но и да се произвежда чиста енергия. Проектът е разработен от ученици и демонстрира бъдещето на енергийната ефективност.';
    }

    if (lowerMessage.includes('помощ') || lowerMessage.includes('помогни')) {
      return 'Радвам да помогна! Мога да ви дам информация за: 🏠 Нашите модели, 💰 Цени и оферти, 🔋 Как работи технологията, 📱 Контакти и поръчки, 🛠️ Монтаж и гаранция. Какво ви интересува най-много?';
    }

    if (lowerMessage.includes('здравей') || lowerMessage.includes('здрасти') || lowerMessage.includes('хей')) {
      return 'Здравейте! Добре дошли в Eclipse Solar Blinds! Аз съм вашият AI асистент и съм тук, за да помогна с всякакви въпроси за соларните щори. Какво бихте искали да научите?';
    }

    if (lowerMessage.includes('благодаря') || lowerMessage.includes('мерси')) {
      return 'Моля ви! Ако имате още въпроси, не се колебайте да питате. Насладете се на разглеждането на сайта!';
    }

    if (lowerMessage.includes('къде') && (lowerMessage.includes('купя') || lowerMessage.includes('поръчам'))) {
      return 'Можете да поръчате през нашия уебсайт на страницата "Поръчка", където има интерактивен калкулатор, или директно на тел: +359 98 822 6863. Предлагаме и безплатен оглед преди поръчка.';
    }

    if (lowerMessage.includes('добър') || lowerMessage.includes('качествен')) {
      return 'Нашите соларни щори са изработени от висококачествени материали с 5 години гаранция. Използваме само сертифицирани соларни панели и компоненти от водещи производители. Всички продукти преминават стриктен контрол на качеството.';
    }

    // Fallback responses with more variety
    const fallbackResponses = [
      'Това е интересен въпрос! За най-точна информация препоръчвам да използвате нашия калкулатор на страницата "Поръчка" или да се свържете с нашите консултанти на +359 98 822 6863.',
      'Разбирам, че искате повече информация. Най-добрият начин да получите персонализирана оферта е чрез нашия калкулатор или директен разговор с наш специалисти.',
      'Благодаря за въпроса! Аз съм AI асистент и мога да отговоря на основни въпроси. За технически детайли и точни оферти, препоръчвам да се свържете с нашите инженери.',
      'Добър въпрос! За пълна информация моля посетете страницата ни с продукти или се обадете на +359 98 822 6863. Ще се радвам да ви помогна с други въпроси!',
      'Интересува ме да ви помогна! Можете да намерите повече информация на страниците "Продукти" и "Поръчка", или да пишете на eclipsesolarblinds@gmail.com.'
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  saveChatHistory() {
    const messages = document.getElementById('chat-messages').innerHTML;
    localStorage.setItem('eclipse-chat-history', messages);
  }

  loadChatHistory() {
    const history = localStorage.getItem('eclipse-chat-history');
    if (history) {
      document.getElementById('chat-messages').innerHTML = history;
    }
  }
}

// Initialize chat bot when page loads
let chatBot;
document.addEventListener('DOMContentLoaded', () => {
  chatBot = new EclipseChatBot();
});
