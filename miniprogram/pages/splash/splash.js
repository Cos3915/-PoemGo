Page({
  data: {
    splashImage: '/img/kaiping.png'
  },
  
  onImageError: function(e) {
    console.log('开屏图片加载失败:', e.detail.errMsg);
  },
  
  onLogin: function() {
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          });
          setTimeout(function() {
            wx.navigateTo({
              url: '/pages/huaxia/huaxia'
            });
          }, 1000);
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  }
});