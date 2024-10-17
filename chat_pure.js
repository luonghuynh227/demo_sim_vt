
class ChatBotGOSU  {

  constructor(options) {
    this.config = options.config || {}
    this.componentProps = options.componentProps || {}
    this.loadCSS()
  }

  loadCSS() {
    // Thêm CSS cho chatbot
    const style = document.createElement('style');
    style.innerHTML = `
        .out-main-bot-gs {
      
      z-index: 9;
    }
    `;
    document.head.appendChild(style); // Thêm style vào head

    this.loadChatbotUI();
  }

  loadChatbotUI() {
    
    `;
  }


}