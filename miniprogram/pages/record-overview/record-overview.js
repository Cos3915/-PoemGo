Page({
  data: {
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
    totalMatches: 0,
    totalWins: 0,
    winRate: 0
  },

  onLoad: function(options) {
    this.loadRecords();
    this.calculateStats();
  },

  loadRecords: function() {
    const records = wx.getStorageSync('records');
    if (records) {
      this.setData({
        records: records
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
  }
});