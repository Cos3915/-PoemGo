Page({
  data: {
    opponentAvatar: '/img/default-avatar.png',
    opponentName: '对手',
    opponentScore: 0,
    myAvatar: '/img/default-avatar.png',
    myName: '我',
    myScore: 0,
    currentRound: 1,
    currentQuestion: {},
    showResult: false,
    resultText: '',
    selectedOption: '',
    questionDatabase: [],
    usedQuestionIndexes: [],
    showGameResult: false,
    gameResultMessage: ''
  },

  onLoad: function(options) {
    this.loadQuestionData();
    this.startRound();
  },

  loadQuestionData: function() {
    const questionDatabase = [
      {
        question: '被称为"西方文学之父"的诗人是',
        options: [
          { label: 'A', text: '维吉尔' },
          { label: 'B', text: '荷马' },
          { label: 'C', text: '奥维德' },
          { label: 'D', text: '贺拉斯' }
        ],
        answer: 'B'
      },
      {
        question: '史诗《神曲》的作者是',
        options: [
          { label: 'A', text: '彼特拉克' },
          { label: 'B', text: '薄伽丘' },
          { label: 'C', text: '但丁' },
          { label: 'D', text: '阿里奥斯托' }
        ],
        answer: 'C'
      },
      {
        question: '莎士比亚的十四行诗共有多少首',
        options: [
          { label: 'A', text: '104首' },
          { label: 'B', text: '126首' },
          { label: 'C', text: '154首' },
          { label: 'D', text: '179首' }
        ],
        answer: 'C'
      },
      {
        question: '"我能否将你比作夏日的一天"出自莎士比亚的哪首十四行诗',
        options: [
          { label: 'A', text: '第12首' },
          { label: 'B', text: '第18首' },
          { label: 'C', text: '第29首' },
          { label: 'D', text: '第116首' }
        ],
        answer: 'B'
      },
      {
        question: '英国浪漫主义诗人华兹华斯与柯勒律治合著的诗集是',
        options: [
          { label: 'A', text: '《抒情歌谣集》' },
          { label: 'B', text: '《西风颂》' },
          { label: 'C', text: '《丁登寺》' },
          { label: 'D', text: '《忽必烈汗》' }
        ],
        answer: 'A'
      },
      {
        question: '长诗《恰尔德·哈罗德游记》的作者是',
        options: [
          { label: 'A', text: '雪莱' },
          { label: 'B', text: '济慈' },
          { label: 'C', text: '拜伦' },
          { label: 'D', text: '骚塞' }
        ],
        answer: 'C'
      },
      {
        question: '"冬天来了，春天还会远吗？"出自雪莱的哪部作品',
        options: [
          { label: 'A', text: '《解放了的普罗米修斯》' },
          { label: 'B', text: '《西风颂》' },
          { label: 'C', text: '《致云雀》' },
          { label: 'D', text: '《伊斯兰的起义》' }
        ],
        answer: 'B'
      },
      {
        question: '济慈的《希腊古瓮颂》中著名的诗句"美即是真，真即是美"出自',
        options: [
          { label: 'A', text: '第一节' },
          { label: 'B', text: '第二节' },
          { label: 'C', text: '第三节' },
          { label: 'D', text: '第五节' }
        ],
        answer: 'D'
      },
      {
        question: '美国诗人惠特曼的代表作是',
        options: [
          { label: 'A', text: '《草叶集》' },
          { label: 'B', text: '《自我的歌唱》' },
          { label: 'C', text: '《阿喀琉斯之盾》' },
          { label: 'D', text: '《比萨诗章》' }
        ],
        answer: 'A'
      },
      {
        question: '狄金森的诗歌在生前仅发表了',
        options: [
          { label: 'A', text: '7首' },
          { label: 'B', text: '12首' },
          { label: 'C', text: '24首' },
          { label: 'D', text: '56首' }
        ],
        answer: 'A'
      }
    ];
    
    this.setData({
      questionDatabase: questionDatabase
    });
  },

  startRound: function() {
    const questionDatabase = this.data.questionDatabase;
    const usedQuestionIndexes = this.data.usedQuestionIndexes;
    
    const availableIndexes = [];
    for (let i = 0; i< questionDatabase.length; i++) {
      if (!usedQuestionIndexes.includes(i)) {
        availableIndexes.push(i);
      }
    }
    
    if (availableIndexes.length === 0) {
      this.setData({
        usedQuestionIndexes: []
      });
      this.startRound();
      return;
    }
    
    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const selectedQuestion = questionDatabase[randomIndex];
    
    this.setData({
      currentQuestion: selectedQuestion,
      showResult: false,
      selectedOption: '',
      usedQuestionIndexes: [...usedQuestionIndexes, randomIndex]
    });
  },

  onSelectOption: function(e) {
    if (this.data.showResult) return;
    
    const selectedOption = e.currentTarget.dataset.option.label;
    const correctAnswer = this.data.currentQuestion.answer;
    
    this.setData({
      selectedOption: selectedOption
    });
    
    let resultText = '';
    if (selectedOption === correctAnswer) {
      resultText = '回答正确！+5分';
      this.setData({
        myScore: this.data.myScore + 5
      });
    } else {
      resultText = `回答错误，正确答案是：${correctAnswer}`;
    }
    
    this.setData({
      showResult: true,
      resultText: resultText
    });
    
    this.simulateOpponentAnswer(correctAnswer);
  },

  simulateOpponentAnswer: function(correctAnswer) {
    const that = this;
    setTimeout(function() {
      const isCorrect = Math.random() >0.5;
      
      if (isCorrect) {
        that.setData({
          opponentScore: that.data.opponentScore + 5
        });
      }
    }, 1500);
  },

  nextRound: function() {
    const currentRound = this.data.currentRound + 1;
    
    if (currentRound<= 10) {
      this.setData({
        currentRound: currentRound
      });
      this.startRound();
    } else {
      this.endGame();
    }
  },

  endGame: function() {
    const myScore = this.data.myScore;
    const opponentScore = this.data.opponentScore;
    let message = '';
    
    if (myScore > opponentScore) {
      message = `您获胜！\n得分：${myScore} - ${opponentScore}`;
    } else if (myScore< opponentScore) {
      message = `对手获胜！\n得分：${myScore} - ${opponentScore}`;
    } else {
      message = `平局！\n得分：${myScore} - ${opponentScore}`;
    }
    
    this.setData({
      showGameResult: true,
      gameResultMessage: message
    });
  },
  
  onResultConfirm: function() {
    wx.navigateBack();
  }
});