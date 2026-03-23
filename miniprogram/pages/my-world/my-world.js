Page({
  data: {
    userInfo: {
      avatar: '/img/default-avatar.png',
      nickname: '诗界旅人'
    },
    records: {
      feihua: {
        wins: 12,
        total: 15,
        winRate: 80,
        recent: [
          { date: '2026-03-23', result: '胜利', score: '5-3' },
          { date: '2026-03-22', result: '失败', score: '2-5' },
          { date: '2026-03-21', result: '胜利', score: '5-2' }
        ]
      },
      tiankong: {
        wins: 18,
        total: 25,
        winRate: 72,
        recent: [
          { date: '2026-03-23', result: '胜利', score: '5-3' },
          { date: '2026-03-22', result: '胜利', score: '5-1' },
          { date: '2026-03-21', result: '失败', score: '3-5' }
        ]
      },
      wenda: {
        wins: 15,
        total: 20,
        winRate: 75,
        recent: [
          { date: '2026-03-23', result: '胜利', score: '5-2' },
          { date: '2026-03-22', result: '失败', score: '2-5' },
          { date: '2026-03-21', result: '胜利', score: '5-4' }
        ]
      }
    },
    collections: [
      {
        id: 1,
        author: '李白',
        title: '静夜思',
        type: 'chinese'
      },
      {
        id: 2,
        author: 'William Shakespeare',
        title: 'Sonnet 18',
        type: 'western'
      }
    ],
    spirits: [
      {
        id: 1,
        name: '静夜思之灵',
        image: '/img/shouji1.png',
        gender: '男',
        personality: '潇洒感性',
        owned: true
      },
      {
        id: 2,
        name: '西风颂之灵',
        image: '/img/shouji2.png',
        gender: '女',
        personality: '开朗温柔',
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
    ],
    totalMatches: 0,
    totalWins: 0,
    winRate: 0
  },

  onLoad: function(options) {
    this.loadUserData();
    this.calculateStats();
  },

  loadUserData: function() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
  },

  calculateStats: function() {
    const records = this.data.records;
    const totalMatches = records.feihua.total + records.tiankong.total + records.wenda.total;
    const totalWins = records.feihua.wins + records.tiankong.wins + records.wenda.wins;
    const winRate = totalMatches > 0 ? Math.round((totalWins / totalMatches) * 100) : 0;
    
    this.setData({
      totalMatches: totalMatches,
      totalWins: totalWins,
      winRate: winRate
    });
  },

  goBack: function() {
    wx.navigateBack();
  },

  goToRecords: function() {
    wx.navigateTo({
      url: '/pages/record-overview/record-overview'
    });
  },

  goToCollections: function() {
    wx.navigateTo({
      url: '/pages/collection-overview/collection-overview'
    });
  },

  goToSpirits: function() {
    wx.navigateTo({
      url: '/pages/spirit-list/spirit-list'
    });
  },

  goToSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  }
});