Page({
  data: {
    opponentAvatar: '/img/default-avatar.png',
    opponentName: '对手',
    myAvatar: '/img/default-avatar.png',
    myName: '我',
    currentToken: '',
    countdown: 30,
    chatMessages: [],
    inputValue: '',
    tokens: [],
    timer: null,
    isMyTurn: true,
    showResult: false,
    resultMessage: ''
  },

  onLoad: function(options) {
    this.loadTokens();
    this.startGame();
  },

  loadTokens: function() {
    const tokens = [
      '花', '月', '风', '雨', '山', '水', '春', '夏', '秋', '冬',
      '日', '夜', '天', '地', '人', '家', '酒', '剑', '琴', '棋',
      '书', '画', '梅', '兰', '竹', '菊', '松', '柳', '桃', '杏'
    ];
    this.setData({
      tokens: tokens
    });
  },

  startGame: function() {
    this.pickRandomToken();
    this.addMessage('system', '轮到你了！');
    this.startCountdown();
  },

  pickRandomToken: function() {
    const tokens = this.data.tokens;
    const randomIndex = Math.floor(Math.random() * tokens.length);
    this.setData({
      currentToken: tokens[randomIndex]
    });
  },

  startCountdown: function() {
    const that = this;
    that.setData({
      countdown: 30
    });
    
    if (that.data.timer) {
      clearInterval(that.data.timer);
    }
    
    that.data.timer = setInterval(function() {
      const currentCountdown = that.data.countdown - 1;
      that.setData({
        countdown: currentCountdown
      });
      
      if (currentCountdown<= 0) {
        clearInterval(that.data.timer);
        that.endGame('超时，您失败了！');
      }
    }, 1000);
  },

  onInputChange: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  onSend: function() {
    const inputValue = this.data.inputValue.trim();
    if (!inputValue) return;
    
    const currentToken = this.data.currentToken;
    
    // 按标点符号分割句子
    const sentences = inputValue.split(/[，。！？.!?]/).filter(s => s.trim() !== '');
    
    if (sentences.length< 2) {
      wx.showToast({
        title: '请输入至少两句诗句',
        icon: 'none'
      });
      return;
    }
    
    // 检查是否有任意一句包含令牌
    const hasToken = sentences.some(sentence =>sentence.includes(currentToken));
    
    if (!hasToken) {
      wx.showToast({
        title: '诗句中必须包含令牌字',
        icon: 'none'
      });
      return;
    }
    
    this.addMessage('me', inputValue);
    this.setData({
      inputValue: ''
    });
    
    this.startCountdown();
    this.simulateOpponentResponse();
  },

  simulateOpponentResponse: function() {
    const that = this;
    setTimeout(function() {
      const responses = [
        '春风又绿江南岸，明月何时照我还',
        '床前明月光，疑是地上霜',
        '举头望明月，低头思故乡',
        '白日依山尽，黄河入海流',
        '欲穷千里目，更上一层楼',
        '春眠不觉晓，处处闻啼鸟',
        '夜来风雨声，花落知多少',
        '飞流直下三千尺，疑是银河落九天',
        '两岸猿声啼不住，轻舟已过万重山',
        '桃花潭水深千尺，不及汪伦送我情'
      ];
      
      const randomIndex = Math.floor(Math.random() * responses.length);
      const response = responses[randomIndex];
      const currentToken = that.data.currentToken;
      
      // 按标点符号分割句子
      const sentences = response.split(/[，。！？.!?]/).filter(s => s.trim() !== '');
      
      if (sentences.length< 2) {
        that.addMessage('opponent', response);
        that.addMessage('system', '对手回答不足两句！扣除5秒，继续对手作答');
        
        let newCountdown = that.data.countdown - 5;
        if (newCountdown<= 0) {
          newCountdown = 0;
          clearInterval(that.data.timer);
          that.endGame('对手超时，您获胜！');
          return;
        }
        
        that.setData({
          countdown: newCountdown
        });
        
        that.simulateOpponentResponse();
      } else {
        // 检查是否有任意一句包含令牌
        const hasToken = sentences.some(sentence =>sentence.includes(currentToken));
        
        if (!hasToken) {
          that.addMessage('opponent', response);
          that.addMessage('system', '对手回答不含令牌！扣除5秒，继续对手作答');
          
          let newCountdown = that.data.countdown - 5;
          if (newCountdown<= 0) {
            newCountdown = 0;
            clearInterval(that.data.timer);
            that.endGame('对手超时，您获胜！');
            return;
          }
          
          that.setData({
            countdown: newCountdown
          });
          
          that.simulateOpponentResponse();
        } else {
          that.addMessage('opponent', response);
          that.addMessage('system', '轮到你了！');
          that.startCountdown();
        }
      }
    }, 1500);
  },

  addMessage: function(type, content) {
    const messages = this.data.chatMessages;
    messages.push({
      id: Date.now(),
      type: type,
      content: content
    });
    this.setData({
      chatMessages: messages
    });
  },

  endGame: function(message) {
    this.setData({
      showResult: true,
      resultMessage: message
    });
  },
  
  onResultConfirm: function() {
    wx.navigateBack();
  },

  onUnload: function() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  }
});