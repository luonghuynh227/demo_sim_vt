
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
        #chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 300px;
            height: 400px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
            z-index: 9999;
            display: flex;
            flex-direction: column;
        }
        
        #chatbot-header {
            background-color: #007BFF;
            color: white;
            padding: 10px;
            border-radius: 10px 10px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        #chatbot-body {
            padding: 10px;
            overflow-y: auto;
            height: calc(100% - 40px);
            flex: 1;
        }

        #chatbot-close {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style); // Thêm style vào head

    this.loadChatbotUI();
  }

  loadChatbotUI() {
    // Tạo container cho chatbot và chèn vào trang web
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    
    // Nội dung của chatbot (tùy chỉnh theo yêu cầu)
    chatbotContainer.innerHTML = `
        <div id="chatbot-header">
            ${this.componentProps.title || 'Chat Assistant'}
            <span id="chatbot-close">&#10005;</span>
        </div>
        <div id="chatbot-body">
            <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
        </div>
    `;

    document.body.appendChild(chatbotContainer);

    // Thêm sự kiện đóng chatbot
    document.getElementById('chatbot-close').addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });
  }

  connectServer() {
    // Kết nối đến server sử dụng bot_id để lấy ngữ cảnh
    const botId = this.config.bot_id;
    fetch(`https://server-chatbot.com/api/context?bot_id=${botId}`) // Thay bằng API thực tế của bạn
        .then(response => response.json())
        .then(data => {
            // Cập nhật nội dung chat với ngữ cảnh từ server
            const chatbotBody = document.getElementById('chatbot-body');
            chatbotBody.innerHTML += `<p>${data.message}</p>`;
        });
  }
}