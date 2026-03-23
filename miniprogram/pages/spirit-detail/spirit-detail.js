Page({
  data: {
    spirit: {
      name: '',
      image: '',
      gender: '',
      personality: '',
      description: '',
      poem: '',
      author: ''
    }
  },

  onLoad: function(options) {
    const spiritId = options.id;
    this.loadSpiritDetail(spiritId);
  },

  loadSpiritDetail: function(spiritId) {
    let spiritData;

    switch(spiritId) {
      case '1':
        spiritData = {
          name: '“静夜思”',
          image: '/img/shouji1.png',
          gender: '男',
          personality: '潇洒感性',
          description: '《静夜思》之灵，拥有李白诗歌的洒脱与浪漫。他常常在月光下漫步，思考人生的意义，充满了文人墨客的气质。',
          poem: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
          author: '李白'
        };
        break;
      case '2':
        spiritData = {
          name: '“西风颂”',
          image: '/img/shouji2.png',
          gender: '女',
          personality: '开朗温柔',
          description: '《西风颂》之灵，拥有雪莱诗歌的热情与希望。她如同西风一样自由奔放，带给人们春天的希望和生命的力量。',
          poem: 'O wild West Wind, thou breath of Autumn\'s being,',
          author: 'Percy Bysshe Shelley'
        };
        break;
      default:
        spiritData = {
          name: '未知诗灵',
          image: '/img/default-avatar.png',
          gender: '',
          personality: '',
          description: '该诗灵尚未解锁',
          poem: '',
          author: ''
        };
    }

    this.setData({
      spirit: spiritData
    });
  },

  goBack: function() {
    wx.navigateBack();
  }
});