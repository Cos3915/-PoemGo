Page({
  data: {
    background: '/img/xifangsj/xifangbg.png',
    huaxiaWorld: '/img/xifangsj/华夏诗界1.png',
    knowledgeSearch: '/img/xifangsj/知识检索11.png',
    aiDialog: '/img/xifangsj/ai对话11.png',
    myWorld: '/img/xifangsj/我的诗界11.png',
    zhishiwenda: '/img/xifangsj/知识问答11.png',
    saiqian: '/img/xifangsj/赛前演练11.png',
    orangeGradient: '/img/xifangsj/橙色渐变.png',
    showMatchWindow: false,
    currentMatchType: '',
    myAccount: '用户12345',
    myAvatar: '/img/default-avatar.png'
  },
  
  onImageError: function(e) {
    console.log('西方诗界图片加载失败:', e.detail.errMsg);
  },
  
  goToHuaxia: function() {
    wx.navigateTo({
      url: '/pages/huaxia/huaxia',
      success: function() {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        });
      }
    });
  },
  
  goToKnowledgeSearch: function() {
    wx.navigateTo({
      url: '/pages/xifang-search/xifang-search',
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
  
  goToMyWorld: function() {
    wx.navigateTo({
      url: '/pages/my-world/my-world'
    });
  },
  
  goToPractice: function() {
    wx.navigateTo({
      url: '/pages/xifang-practice/xifang-practice'
    });
  }
});