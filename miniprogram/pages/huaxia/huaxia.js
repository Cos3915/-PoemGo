Page({
  data: {
    background: '/img/huaxiasj/hxbg.png',
    westWorld: '/img/huaxiasj/西方诗界1.png',
    knowledgeSearch: '/img/huaxiasj/知识检索1.png',
    aiDialog: '/img/huaxiasj/ai对话1.png',
    myWorld: '/img/huaxiasj/我的诗界1.png',
    feihua: '/img/huaxiasj/飞花令1.png',
    shici: '/img/huaxiasj/诗词填空1.png',
    saiqian: '/img/huaxiasj/赛前演练1.png',
    blueGradient: '/img/huaxiasj/蓝色渐变.png',
    showMatchWindow: false,
    currentMatchType: '',
    myAccount: '用户12345',
    myAvatar: '/img/default-avatar.png'
  },
  
  onImageError: function(e) {
    console.log('华夏诗界图片加载失败:', e.detail.errMsg);
  },
  
  goToXifang: function() {
    wx.navigateTo({
      url: '/pages/xifang/xifang',
      success: function() {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        });
      }
    });
  },
  
  onStartMatch: function(e) {
    const matchType = e.currentTarget.dataset.matchType;
    this.setData({
      showMatchWindow: true,
      currentMatchType: matchType
    });
  },
  
  onMatchSuccess: function() {
    const matchType = this.data.currentMatchType;
    let url = '';
    
    switch (matchType) {
      case '飞花令':
        url = '/pages/feihua-duel/feihua-duel';
        break;
      case '诗词填空':
        url = '/pages/tiankong-duel/tiankong-duel';
        break;
      case '知识问答':
        url = '/pages/wenda-duel/wenda-duel';
        break;
      default:
        url = '/pages/duel/duel';
    }
    
    this.setData({
      showMatchWindow: false,
      currentMatchType: ''
    });
    
    wx.navigateTo({
      url: url
    });
  },
  
  onCancelMatch: function() {
    this.setData({
      showMatchWindow: false,
      currentMatchType: ''
    });
  },
  
  goToKnowledgeSearch: function() {
    wx.navigateTo({
      url: '/pages/knowledge-search/knowledge-search'
    });
  },
  
  goToMyWorld: function() {
    wx.navigateTo({
      url: '/pages/my-world/my-world'
    });
  },
  
  goToPractice: function() {
    wx.navigateTo({
      url: '/pages/huaxia-practice/huaxia-practice'
    });
  }
});