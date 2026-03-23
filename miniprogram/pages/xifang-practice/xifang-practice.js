Page({
  data: {
    myAvatar: '/img/default-avatar.png',
    opponentAvatar: '/img/default-avatar.png',
    myNickname: '我',
    opponentNickname: '诗界AI',
    currentRound: 1,
    myScore: 0,
    opponentScore: 0,
    currentQuestion: null,
    selectedOption: '',
    showResult: false,
    resultText: '',
    showExitConfirm: false,
    questionDatabase: [
      {
        question: 'Who wrote the poem "Sonnet 18"?',
        options: [
          { label: 'A', text: 'William Shakespeare' },
          { label: 'B', text: 'John Milton' },
          { label: 'C', text: 'Percy Bysshe Shelley' },
          { label: 'D', text: 'John Keats' }
        ],
        answer: 'A'
      },
      {
        question: 'Which poem contains the line "O wild West Wind"?',
        options: [
          { label: 'A', text: 'Ode to the West Wind' },
          { label: 'B', text: 'The Tyger' },
          { label: 'C', text: 'I Wandered Lonely as a Cloud' },
          { label: 'D', text: 'Kubla Khan' }
        ],
        answer: 'A'
      },
      {
        question: 'What is the main theme of "The Raven"?',
        options: [
          { label: 'A', text: 'Love' },
          { label: 'B', text: 'Death' },
          { label: 'C', text: 'Nature' },
          { label: 'D', text: 'War' }
        ],
        answer: 'B'
      },
      {
        question: 'Who is the author of "Leaves of Grass"?',
        options: [
          { label: 'A', text: 'Walt Whitman' },
          { label: 'B', text: 'Emily Dickinson' },
          { label: 'C', text: 'Robert Frost' },
          { label: 'D', text: 'Edgar Allan Poe' }
        ],
        answer: 'A'
      },
      {
        question: 'Which poem begins with "I wandered lonely as a cloud"?',
        options: [
          { label: 'A', text: 'Daffodils' },
          { label: 'B', text: 'The Solitary Reaper' },
          { label: 'C', text: 'Kubla Khan' },
          { label: 'D', text: 'The Rime of the Ancient Mariner' }
        ],
        answer: 'A'
      }
    ]
  },

  onLoad: function(options) {
    this.startNewRound();
  },

  startNewRound: function() {
    const randomIndex = Math.floor(Math.random() * this.data.questionDatabase.length);
    const question = this.data.questionDatabase[randomIndex];
    
    this.setData({
      currentQuestion: question,
      selectedOption: '',
      showResult: false,
      resultText: ''
    });
  },

  onSelectOption: function(e) {
    const selectedOption = e.currentTarget.dataset.option;
    
    this.setData({
      selectedOption: selectedOption,
      showResult: true
    });
    
    if (selectedOption === this.data.currentQuestion.answer) {
      this.setData({
        myScore: this.data.myScore + 1,
        resultText: '回答正确！'
      });
    } else {
      this.setData({
        opponentScore: this.data.opponentScore + 1,
        resultText: `回答错误，正确答案：${this.getCorrectAnswerText()}`
      });
    }
  },
  
  getCorrectAnswerText: function() {
    const correctOption = this.data.currentQuestion.options.find(opt => opt.label === this.data.currentQuestion.answer);
    return correctOption ? `${correctOption.label}. ${correctOption.text}` : '';
  },
  
  nextRound: function() {
    setTimeout(() => {
      this.setData({
        currentRound: this.data.currentRound + 1
      });
      this.startNewRound();
    }, 500);
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