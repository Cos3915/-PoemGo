Page({
  data: {
    myAvatar: '/img/default-avatar.png',
    opponentAvatar: '/img/default-avatar.png',
    myNickname: '我',
    opponentNickname: '诗界AI',
    currentRound: 1,
    myScore: 0,
    opponentScore: 0,
    currentPoetry: null,
    answer: '',
    poetryDatabase: [
      {
        title: '静夜思',
        author: '李白',
        paragraphs: ['床前明月光', '疑是地上霜', '举头望明月', '低头思故乡']
      },
      {
        title: '春晓',
        author: '孟浩然',
        paragraphs: ['春眠不觉晓', '处处闻啼鸟', '夜来风雨声', '花落知多少']
      },
      {
        title: '登鹳雀楼',
        author: '王之涣',
        paragraphs: ['白日依山尽', '黄河入海流', '欲穷千里目', '更上一层楼']
      },
      {
        title: '相思',
        author: '王维',
        paragraphs: ['红豆生南国', '春来发几枝', '愿君多采撷', '此物最相思']
      },
      {
        title: '望庐山瀑布',
        author: '李白',
        paragraphs: ['日照香炉生紫烟', '遥看瀑布挂前川', '飞流直下三千尺', '疑是银河落九天']
      }
    ],
    showExitConfirm: false
  },

  onLoad: function(options) {
    this.startNewRound();
  },

  startNewRound: function() {
    const randomIndex = Math.floor(Math.random() * this.data.poetryDatabase.length);
    const poetry = this.data.poetryDatabase[randomIndex];
    
    const randomLineIndex = Math.floor(Math.random() * poetry.paragraphs.length);
    
    const modifiedParagraphs = poetry.paragraphs.map((line, index) => {
      if (index === randomLineIndex && line.length >= 4) {
        const startPos = 1;
        const endPos = line.length - 2;
        return line.substring(0, startPos) + '____' + line.substring(endPos);
      }
      return line;
    });
    
    this.setData({
      currentPoetry: {
        ...poetry,
        paragraphs: modifiedParagraphs,
        answerLine: poetry.paragraphs[randomLineIndex],
        lineIndex: randomLineIndex
      },
      answer: ''
    });
  },

  onAnswerChange: function(e) {
    this.setData({
      answer: e.detail.value
    });
  },

  onSubmit: function() {
    const userAnswer = this.data.answer.trim();
    const correctAnswer = this.data.currentPoetry.answerLine;
    
    if (userAnswer === correctAnswer) {
      this.setData({
        myScore: this.data.myScore + 1
      });
    } else {
      this.setData({
        opponentScore: this.data.opponentScore + 1
      });
    }
    
    setTimeout(() => {
      this.setData({
        currentRound: this.data.currentRound + 1
      });
      this.startNewRound();
    }, 1000);
  },

  onExit: function() {
    this.setData({
      showExitConfirm: true
    });
  },

  confirmExit: function() {
    wx.navigateBack();
  },

  cancelExit: function() {
    this.setData({
      showExitConfirm: false
    });
  }
});