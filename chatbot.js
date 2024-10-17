
class ChatBotGOSU  {

  constructor(options) {
    this.config = options.config || {}
    this.componentProps = options.componentProps || {}
    this.loadCSS()
  }

  loadCSS_bk() {
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
  loadCSS() {
    // Thêm CSS cho chatbot
    const style = document.createElement('style');
    style.innerHTML = `
        .out-main-bot-gs {
      
      z-index: 9;
    }
    .button-show-main-bot-gs {
      cursor: pointer;
      position: fixed;
      bottom: 30px;
      right: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      width: 56px;
      cursor: pointer;
      z-index: 8;
      border-radius: 50%;
      transition: transform 0.3s ease;
      background: #4d53e8;
    }
    .main-bot-gs {
      position: fixed;
      z-index: 9;
      width: 460px;
      height: calc(80% - 40px);
      min-height: 400px;
      max-height: 1200px;
      bottom: 20px;
      right: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 6px 8px 0 rgba(29, 28, 35, 0.06), 0 0 2px 0 rgba(29, 28, 35, 0.18);
      display: none;
    }
    .main-bot-gs.open {
      display: block;
    }
    .inside-main-bot-gs {
      background: #fff;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .header-bot-gs {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0 16px;
      border-bottom: 1px solid #1d1c2314;
    }
    .btn-close-gs {
      margin-left: auto;
    }

    .main-list-chat-gs {
      flex: 1 1 auto;
      min-height: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .list-chat-bot-gs {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      width: 100%;
      /* height: 100%; */
      min-height: 0;
    }
    .control-chat-gs {
      margin-top: auto;
    }

    .footer-bot-gs {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      border-radius: 0 0 8px 8px;
      background-color: #2e2e380a;
      font-size: 12px;
    }

    .chat__conversation-board__message-container {
      margin: 0 0 2em 0;
      position: relative;
      display: flex;
      flex-direction: row;
    }
    .chat__conversation-board__message-container.reversed {
      flex-direction: row-reverse;
    }
    .chat__conversation-board__message__person {
      text-align: center;
      margin: 0 1.2em 0 0;
    }
    .chat__conversation-board__message__person__avatar {
      height: 35px;
      width: 35px;
      overflow: hidden;
      border-radius: 50%;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      ms-user-select: none;
      position: relative;
    }
    .chat__conversation-board__message__person__avatar img {
      height: 100%;
      width: auto;
    }
    .chat__conversation-board__message__person__nickname {
      font-size: 9px;
      color: #484848;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      display: none;
    }
    .chat__conversation-board__message__context {
      max-width: 55%;
      align-self: flex-end;
    }
    .chat__conversation-board__message__bubble span {
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      display: inline-table;
      word-wrap: break-word;
      background: #14181a;
      font-size: 13px;
      color: #a3a3a3;
      padding: 0.5em 0.8em;
      line-height: 1.5;
      border-radius: 6px;
    }

    .chat__conversation-panel {
      background: #131719;
      border-radius: 12px;
      padding: 0 1em;
      height: 55px;
      margin: 0.5em 0 0;
    }
    .chat__conversation-panel__container {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
    }
    `;
    document.head.appendChild(style); // Thêm style vào head

    this.loadChatbotUI();
  }

  loadChatbotUI() {
    // Tạo container cho chatbot và chèn vào trang web
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'out-main-bot-gs';

    // Nội dung của chatbot
    chatbotContainer.innerHTML = `
        <div class="button-show-main-bot-gs"></div>
        <div class="main-bot-gs">
            <div class="inside-main-bot-gs">
                <div class="header-bot-gs">
                    <div class="logo-name-header-gs">
                        <div class="logo"></div>
                        <div class="name-bot-gs">${this.componentProps.title || 'Chat Assistant'}</div>
                    </div>
                    <div class="btn-close-gs">X</div>
                </div>

                <div class="main-list-chat-gs">
                    <div class="list-chat-bot-gs">
                        <div class="chat__conversation-board__message-container">
                            <div class="chat__conversation-board__message__person">
                                <div class="chat__conversation-board__message__person__avatar">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Monika Figi">
                                </div>
                                <span class="chat__conversation-board__message__person__nickname">Monika Figi</span>
                            </div>
                            <div class="chat__conversation-board__message__context">
                                <div class="chat__conversation-board__message__bubble">
                                    <span>Somewhere stored deep, deep in my memory banks is the phrase "It really whips the llama's ass".</span>
                                </div>
                            </div>
                        </div>

                        <div class="chat__conversation-board__message-container reversed">
                            <div class="chat__conversation-board__message__person">
                                <div class="chat__conversation-board__message__person__avatar">
                                    <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="Dennis Mikle">
                                </div>
                                <span class="chat__conversation-board__message__person__nickname">Dennis Mikle</span>
                            </div>
                            <div class="chat__conversation-board__message__context">
                                <div class="chat__conversation-board__message__bubble">
                                    <span>Winamp's still an essential.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="control-chat-gs">
                        <div class="chat__conversation-panel">
                            <div class="chat__conversation-panel__container">
                                <button class="chat__conversation-panel__button panel-item btn-icon add-file-button">
                                    <svg class="feather feather-plus sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <button class="chat__conversation-panel__button panel-item btn-icon emoji-button">
                                    <svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                    </svg>
                                </button>
                                <input class="chat__conversation-panel__input panel-item" placeholder="Type a message...">
                                <button class="chat__conversation-panel__button panel-item btn-icon send-message-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer class="footer-bot-gs">
                    Powered by GOSU. AI-generated content for reference only.
                </footer>
            </div>
        </div>
    `;

    // Thêm chatbot vào body
    document.body.appendChild(chatbotContainer);

    // Thêm sự kiện click để hiện chatbot khi nhấn vào button-show-main-bot-gs
    document.querySelector('.button-show-main-bot-gs').addEventListener('click', () => {
        const mainBot = document.querySelector('.main-bot-gs');
        if (mainBot.style.display === 'none' || mainBot.style.display === '') {
            mainBot.style.display = 'block';
        } else {
            mainBot.style.display = 'none';
        }
    });

    // Thêm sự kiện đóng chatbot
    document.querySelector('.btn-close-gs').addEventListener('click', () => {
        document.querySelector('.main-bot-gs').style.display = 'none';
    });
  }

  loadChatbotUI_bk() {
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