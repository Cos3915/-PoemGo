Page({
  data: {
    collections: []
  },

  onLoad: function(options) {
    this.loadCollections();
  },

  loadCollections: function() {
    const collections = wx.getStorageSync('collections');
    if (collections && collections.length > 0) {
      this.setData({
        collections: collections
      });
    }
  },

  goToPoetryDetail: function(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/poetry-detail/poetry-detail?title=${encodeURIComponent(item.title)}&author=${encodeURIComponent(item.author)}&type=${item.type}`
    });
  },
  
  goBack: function() {
    wx.navigateBack();
  }
});