Page({
  data: {
    spirits: [
      {
        id: 1,
        name: '“静夜思”',
        image: '/img/shouji1.png',
        owned: true
      },
      {
        id: 2,
        name: '“西风颂”',
        image: '/img/shouji2.png',
        owned: true
      },
      {
        id: 3,
        name: '待解锁',
        image: '/img/default-avatar.png',
        gender: '',
        personality: '',
        owned: false
      }
    ]
  },

  onLoad: function(options) {
    this.loadSpirits();
  },

  loadSpirits: function() {
    const spirits = wx.getStorageSync('spirits');
    if (spirits && spirits.length > 0) {
      this.setData({
        spirits: spirits
      });
    }
  },

  goToSpiritDetail: function(e) {
    const spiritId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/spirit-detail/spirit-detail?id=${spiritId}`
    });
  },
  
  goBack: function() {
    wx.navigateBack();
  }
});