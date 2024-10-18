
class ChatBot  {
  

  constructor(options) {
    this.api = 'http://192.168.90.194:5005/webhooks/rest/webhook'
    this.config = options.config || { code: '', service: 'g_GOSU', bot_id: ''}
    this.componentProps = options.componentProps || {
      title: 'Chat Bot GOSU',
      nameBotShowChat: 'Bot',
      iconBot: 'images/icon-gs.png',
      iconUser: 'images/user.png',
    }
    
    this.isClickOpenchat = false
    this.loading = false;
    this.pageCurrent = 1;
    this.allMessages = [];
    this.userIdCookieName = 'chatGS_'+this.config.service;
    this.userId = '';
    this.isSend = false;
    this.isGetMesageServer = false
    

    this.init()
    // this.getData()
   
  }


  init() {

    this.userId = this.getCookie(this.userIdCookieName);
    if (!this.userId) {
      // if not cookies create news
      this.userId = this.generateUniqueId();
      // save cookie
      this.setCookie(this.userIdCookieName, this.userId, 365); // Cookie 635 day
    }

    this.loadCSS()
    
  }

  generateUniqueId(length = 50) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return this.config.service+'_'+result;
  }
  setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
  }
  getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  checkInput() {
    
    const inputAsk = document.getElementById('input-ask');
    if (inputAsk.value.trim() != '' && !this.isGetMesageServer) {
      this.isSend = true; 
      document.querySelector('.send-file').classList.add('active');
    } else {
        this.isSend = false; 
        document.querySelector('.send-file').classList.remove('active');
    }
  }


  loadChatForUser(userId) {
    console.log(`Loading chat for user ID: ${userId}`);
  }

  getData() {
    this.isClickOpenchat = true
  }

  loadCSS() {
    const style = document.createElement('style');
    style.innerHTML = `
      .f-tahoma{font-family:"tahoma"}.f-tahomabold{font-family:"tahomabold"}.f-tahoma{font-family:"tahoma"}.f-uvn_laclongquanbold{font-family:"uvn_laclongquanbold"}*{-webkit-box-sizing:border-box;box-sizing:border-box}.a100{width:100%;height:100%;display:block}.d-flex{display:-webkit-box;display:-ms-flexbox;display:flex}.a-center{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.j-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.f-d-column{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.flex-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.h-100-percent{height:100%}button{border:none;background:transparent}.o-hide{overflow:hidden}.p-relative{position:relative}.p-absolute{position:absolute}.m-auto{margin-left:auto;margin-right:auto}.c-pointer{cursor:pointer}.t-upper{text-transform:uppercase}.t-center{text-align:center}.t-under{text-decoration:underline!important}.c-black{color:#000!important}.c-white{color:#fff!important}body{margin:0;padding:0}.wrap-main-bot{z-index:9;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif}.button-show-main-bot{cursor:pointer;position:fixed;bottom:20px;right:15px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:56px;width:56px;cursor:pointer;z-index:8;border-radius:50%;-webkit-transition:-webkit-transform 0.3s ease;transition:-webkit-transform 0.3s ease;transition:transform 0.3s ease;transition:transform 0.3s ease,-webkit-transform 0.3s ease;background:#fff;-webkit-box-shadow:1px 2px 4px rgba(0,0,0,0.2);box-shadow:1px 2px 4px rgba(0,0,0,0.2);overflow:hidden}.button-show-main-bot img{height:56px;width:56px}.main-bot{position:fixed;z-index:9;width:calc(100% - 30px);height:calc(98% - 30px);min-height:400px;max-height:1200px;bottom:15px;right:15px;background-color:#fff;border-radius:8px;-webkit-box-shadow:0 6px 8px 0 rgba(29,28,35,0.06),0 0 2px 0 rgba(29,28,35,0.18);box-shadow:0 6px 8px 0 rgba(29,28,35,0.06),0 0 2px 0 rgba(29,28,35,0.18)}@media only screen and (min-width:768px){.main-bot{width:460px}}.main-bot.open{display:block}.body-main-bot{-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%}.header-bot{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:56px;padding:0 16px;border-bottom:1px solid rgba(29,28,35,0.0784313725)}.header-bot .logo-name-header{gap:0 6px}.header-bot .logo-name-header img{width:32px}.btn-close{margin-left:auto}.main-list-chat{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.main-list-chat .detail-list-chat{height:calc(100% - 50px);overflow-y:auto;padding-bottom:70px;-webkit-mask:-webkit-gradient(linear,left top,left bottom,color-stop(91.89%,#fff),to(rgba(255,255,255,0)));-webkit-mask:linear-gradient(180deg,#fff 91.89%,rgba(255,255,255,0) 100%);mask:-webkit-gradient(linear,left top,left bottom,color-stop(91.89%,#fff),to(rgba(255,255,255,0)));mask:linear-gradient(180deg,#fff 91.89%,rgba(255,255,255,0) 100%)}.main-list-chat .detail-list-chat::-webkit-scrollbar{width:2px}.main-list-chat .detail-list-chat::-webkit-scrollbar-thumb{background:#b5b5b5}.main-list-chat .detail-list-chat::-webkit-scrollbar-track{background:#f5f5f5}.row-chat{padding:15px;gap:15px 10px}.row-chat.user{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse}.row-chat .logo-chat{width:32px}.row-chat .logo-chat img{width:100%}.row-chat .name-chat-message{max-width:65%}.row-chat .name-chat-message .name-user{margin-bottom:5px}.row-chat .name-chat-message .all-message{background:#f5f5f5;border-radius:10px;padding:10px}.control-chat-message{z-index:9;background:#fff;width:93%;height:60px;bottom:2%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);border-radius:35px;border:2px solid #f5f5f5}.control-chat-message textarea::-webkit-input-placeholder{color:#828384}.control-chat-message textarea::-moz-placeholder{color:#828384}.control-chat-message textarea:-ms-input-placeholder{color:#828384}.control-chat-message textarea::-ms-input-placeholder{color:#828384}.control-chat-message textarea::placeholder{color:#828384}.control-chat-message .textarea-content{font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;padding:0;overflow-y:hidden;resize:none;height:45px;line-height:45px;min-height:20px;max-height:100px;background:transparent;border:0;width:80%;left:10%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);border:none;overflow:auto;outline:none;-webkit-box-shadow:none;box-shadow:none;resize:none}.control-chat-message .textarea-content:hover{border:none}.control-chat-message .add-file{border-radius:10px;padding:3px 7px;left:3%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.control-chat-message .add-file svg{color:#828384}.control-chat-message .add-file:hover{background:#f5f5f5}.control-chat-message .send-file{border-radius:10px;padding:3px 7px;right:3%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.control-chat-message .send-file svg{color:#828384}.control-chat-message .send-file:hover{background:#f5f5f5}.control-chat-message .send-file:not(.active){pointer-events:none;-webkit-filter:grayscale(1);filter:grayscale(1)}.message-loading .loading-dot{border-radius:50%;-webkit-animation:dot ease-in-out 0.85s infinite;animation:dot ease-in-out 0.85s infinite;background-color:grey;display:inline-block;height:6px;width:6px;margin:2px}.message-loading .loading-dot:first-child{-webkit-animation-delay:0.2s;animation-delay:0.2s}.message-loading .loading-dot:nth-child(2){-webkit-animation-delay:0.3s;animation-delay:0.3s}.message-loading .loading-dot:nth-child(3){-webkit-animation-delay:0.4s;animation-delay:0.4s}.message-loading .loading-dot:nth-child(4){-webkit-animation-delay:0.5s;animation-delay:0.5s}.message-loading .loading-dot:nth-child(5){-webkit-animation-delay:0.6s;animation-delay:0.6s}.message-loading .loading-dot:nth-child(6){-webkit-animation-delay:0.7s;animation-delay:0.7s}.footer-bot{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:32px;border-radius:0 0 8px 8px;background-color:rgba(46,46,56,0.0392156863);font-size:clamp(10px,2vw,13px)}@-webkit-keyframes dot{0%{background-color:grey;-webkit-transform:scale(1);transform:scale(1)}50%{background-color:#ed8b33;-webkit-transform:scale(1.3);transform:scale(1.3)}to{background-color:grey;-webkit-transform:scale(1);transform:scale(1)}}@keyframes dot{0%{background-color:grey;-webkit-transform:scale(1);transform:scale(1)}50%{background-color:#ed8b33;-webkit-transform:scale(1.3);transform:scale(1.3)}to{background-color:grey;-webkit-transform:scale(1);transform:scale(1)}}
    `;
    document.head.appendChild(style); 

    this.loadChatbotUI();
    
  }

  loadChatbotUI() {
    const chatList = document.querySelector('.detail-list-chat');
    const chatBotContainer = document.createElement('div');
    chatBotContainer.className = 'wrap-main-bot';
    chatBotContainer.innerHTML = `
     <div class="button-show-main-bot">
        <img src="${this.componentProps.iconBot}" alt="Click">
      </div>
      <div class="main-bot" style="display: none;">
      </div>
    `;
       
    document.body.appendChild(chatBotContainer);

    const mainBot = document.querySelector('.main-bot');
    document.querySelector('.button-show-main-bot').addEventListener('click', () => {
      if (mainBot.style.display === 'none' || mainBot.style.display === '') {
          mainBot.style.display = 'block';
          if (mainBot) {
            
            if(!this.isClickOpenchat) {
              this.isClickOpenchat = true
              mainBot.innerHTML = this.loadListChatFull();
              
              // get list chat fisrt load site
              this.loadChatForUser(this.userId)
              const chatMessages = this.fakeData();
              this.renderMessages(chatMessages)
              // this.scrollBottomChat(chatList)
            }
            this.loadButtonListieners()
          }
      } else {
          mainBot.style.display = 'none';
      }
    });

    
  }

  loadHeaderUI() {
    return `
    
      <div class="header-bot">
        <div class="logo-name-header d-flex a-center">
          <div class="logo">
            <img src="${this.componentProps.iconBot}" alt="Icon">
          </div>
          <div class="name-bot">${this.componentProps.title}</div>
        </div>
        <div class="btn-close c-pointer">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" focusable="false" aria-hidden="true"><path d="M17.6568 19.7782C18.2426 20.3639 19.1924 20.3639 19.7782 19.7782C20.3639 19.1924 20.3639 18.2426 19.7782 17.6568L14.1213 12L19.7782 6.34313C20.3639 5.75734 20.3639 4.8076 19.7782 4.22181C19.1924 3.63602 18.2426 3.63602 17.6568 4.22181L12 9.87866L6.34313 4.22181C5.75734 3.63602 4.8076 3.63602 4.22181 4.22181C3.63602 4.8076 3.63602 5.75734 4.22181 6.34313L9.87866 12L4.22181 17.6568C3.63602 18.2426 3.63602 19.1924 4.22181 19.7782C4.8076 20.3639 5.75734 20.3639 6.34313 19.7782L12 14.1213L17.6568 19.7782Z" fill="currentColor"></path></svg>
        </div>
      </div>
    
    `;
  }
  loadFooterUI() {
    return `
      <footer class="footer-bot">
        Powered by .... AI-generated content for reference only.
      </footer>
    `;
  }

  // <textarea class="textarea-content p-absolute" placeholder="Message Chat" id="input-ask"></textarea>
  //  <input class="textarea-content p-absolute" placeholder="Message Chat" id="input-ask">
  loadControlUI() {
    return `
    <div class="control-chat-message p-absolute">
      <textarea class="textarea-content p-absolute" placeholder="Message Chat" id="input-ask"></textarea>
      
     
      <div class="add-file p-absolute c-pointer">
        <svg class="icon-icon icon-icon-coz_plus_circle coz-fg-primary text-xxl" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 8V11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H11V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H13V8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path></svg>
      </div>
      <div class="send-file p-absolute c-pointer "  id="sendBtn">
        <svg class="icon-icon icon-icon-coz_send_fill text-xxl" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21.4159 13.3153C21.8961 13.0536 22.1965 12.5506 22.1965 11.9998C22.1965 11.449 21.8961 10.9483 21.4159 10.6865L3.99982 1.25701C3.53551 1.00437 2.98699 1.01575 2.53179 1.2866C2.07659 1.55744 1.80347 2.03768 1.80347 2.57027L3.725 10.0755L11.8947 11.2715C12.363 11.2715 12.7414 11.5969 12.7414 11.9998C12.7414 12.4026 12.363 12.7281 11.8947 12.7281C7.2906 13.4031 4.56846 13.799 3.72825 13.9159L1.80347 21.4293C1.80347 21.9619 2.07659 22.4421 2.53179 22.7153C2.98699 22.9861 3.53551 22.9975 3.99982 22.7448L21.4159 13.3153Z"></path></svg>
      </div>
    </div>
    `;
  }

  loadListChatFull() {

    return `
      <div class="main-bot">
        <div class="body-main-bot">

          ${this.loadHeaderUI()}

          <div class="main-list-chat p-relative">
            <div class="detail-list-chat"  id="message-container">

            </div>

            ${this.loadControlUI()}
            
          </div>

          ${this.loadFooterUI()}

        </div>
      </div>
        
    `;
  }


  loadButtonListieners() {
    let _this = this

    document.querySelector('.btn-close').addEventListener('click', () => {
      document.querySelector('.main-bot').style.display = 'none';
      // this.isClickOpenchat = true
    });

    const sendBtn = document.getElementById('sendBtn');
    const inputAsk = document.getElementById('input-ask');
    const textArea = document.querySelector('.textarea-content');
    
    inputAsk.addEventListener('input', _this.checkInput.bind(_this));

    sendBtn.addEventListener('click', () => {
      if (!_this.isSend) {
        alert('Vui lòng nhập gì đó!!')
      } else {
        const message = textArea.value.trim();
        if (message) {
          _this.appendUserMessageToChat(message); 
          _this.sendMessageToBot(message)
          textArea.value = ''; 
          document.querySelector('.send-file').classList.remove('active');
        }
      }
      
    });
    inputAsk.addEventListener('keydown', function(event) {
      
      if(!_this.isGetMesageServer) {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          const message = textArea.value.trim();
          if (message) {
            _this.appendUserMessageToChat(message); 
            _this.sendMessageToBot(message)
            textArea.value = ''; 
          }
        }
      }
      
    });
    

    const listScroll = document.getElementById('message-container');
    listScroll.addEventListener('scroll', () => {
      if (listScroll.scrollTop === 0 && !_this.loading) {
        _this.pageCurrent++;
        _this.fetchMessageServer(_this.pageCurrent)
      }
    });

    _this.checkInput()
  }

  getMessageInput() {
    const message = textArea.value.trim();
    return message
  }

  async sendMessageToBot(message) {

    this.loadingMessage()

    try {
      this.isGetMesageServer = true

      const response = await fetch(`${this.api}${this.config.code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: this.userId,
          message: message
        })
      });
  
      if (!response.ok) {
        this.removeLoadingMessage()
        this.appendMessageToChat('Lỗi khi gửi yêu cầu: ' + response.statusText); 
        this.isGetMesageServer = false
        this.checkInput()
      }
  
      const data = await response.json();
  
      if (data && data.length > 0 && data[0].text) {
        this.removeLoadingMessage()
        this.appendMessageToChat(data[0].text); 
        this.isGetMesageServer = false
        this.checkInput()
      } else {
        this.removeLoadingMessage();
        this.appendMessageToChat('Không có phản hồi hợp lệ từ chatbot. '); 
        this.isGetMesageServer = false
        this.checkInput()
      }
    } catch (error) {
      this.removeLoadingMessage()
      this.appendMessageToChat('Lỗi ko rõ nguồn gốc:', error); 
      this.isGetMesageServer = false
      this.checkInput()
    }
  }

  
  fakeData() {
    const messages = [
      { user: "bot", text: "Hello! How can I help you today?" },
    ];
    
    return messages;
  }
  

  fetchMessageServer(pageCurrent) {
    console.log("Fetching messages for page:", pageCurrent);
    
    const messages = this.fakeData();

    this.renderMessages(messages);
  }

  
  renderMessages(messages) {
    
    const messageContainer = document.getElementById('message-container');

    messages.forEach(message => {
        const messageHTML = `
          <div class="row-chat d-flex ${message.user === 'user' ? 'user' : 'bot'}">
            <div class="logo-user-chat logo-chat">
                <img src="${message.user === 'user' ? `${this.componentProps.iconUser}` : `${this.componentProps.iconBot}` }" alt="">
            </div>
            <div class="name-chat-message">
                ${message.user === 'user' ? '' : `<div class="name-user">${this.componentProps.nameBotShowChat}</div>`}
                <div class="all-message">
                    <div class="pure-message">${message.text}</div>
                </div>
            </div>
          </div>
        `;
        messageContainer.insertAdjacentHTML('afterbegin', messageHTML); // Chèn vào đầu danh sách
    });
  }


  appendUserMessageToChat(userMessage) {
    const chatList = document.querySelector('.detail-list-chat');
  
    const newMessage = document.createElement('div');
    newMessage.className = 'row-chat d-flex user';
    newMessage.innerHTML = `
      <div class="logo-user-chat logo-chat">
        <img src="${this.componentProps.iconUser}" alt="">
      </div>
      <div class="name-chat-message">
        <div class="all-message">
          <div class="pure-message">${userMessage}</div>
        </div>
      </div>
    `;
  
    chatList.appendChild(newMessage);
  
    this.scrollBottomChat(chatList)
  }
  

  sendMessage(message) {
    this.appendMessageToChat(message);
  }

  appendMessageToChat(replyMessage) {
    const chatList = document.querySelector('.detail-list-chat');
  
    const newMessage = document.createElement('div');
    newMessage.className = 'row-chat d-flex bot';
    newMessage.innerHTML = `
      <div class="logo-user-chat logo-chat">
        <img src="${this.componentProps.iconBot}" alt="">
      </div>
      <div class="name-chat-message">
        <div class="name-user">${this.componentProps.nameBotShowChat}</div>
        <div class="all-message">
          <div class="pure-message">${replyMessage}</div>
        </div>
      </div>
    `;
  
    chatList.appendChild(newMessage);
  
    this.scrollBottomChat(chatList)
  }

  
  loadingMessage() {
    
    const chatList = document.querySelector('.detail-list-chat');
  
    const newMessage = document.createElement('div');
    newMessage.className = 'row-chat d-flex bot row-loading';
    newMessage.innerHTML = `
      <div class="logo-user-chat logo-chat">
        <img src="${this.componentProps.iconBot}" alt="">
      </div>
      <div class="name-chat-message">
        <div class="name-user">${this.componentProps.nameBotShowChat}</div>
        <div class="all-message">
          <div class="pure-message message-loading d-flex a-center j-center">
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
            </div>
        </div>
      </div>
    `;
  
    chatList.appendChild(newMessage);
  
    this.scrollBottomChat(chatList)
  }

  removeLoadingMessage() {
    const loadingMessage = document.querySelector('.row-loading');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }
  
  scrollBottomChat(chatList) {
    chatList.scrollTop = chatList.scrollHeight;
  }

}