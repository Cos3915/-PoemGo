Page({
  data: {
    poetry: {},
    isCollected: false,
    isWestern: false
  },

  onLoad: function(options) {
    if (options.poetry) {
      const poetry = JSON.parse(decodeURIComponent(options.poetry));
      // 判断是否为西方诗歌（有lines字段而不是paragraphs字段）
      const isWestern = poetry.lines && !poetry.paragraphs;
      this.setData({
        poetry: poetry,
        isWestern: isWestern
      });
      this.checkCollected(poetry.title || poetry.rhythmic);
    } else if (options.id) {
      const id = options.id;
      this.loadPoetryDetail(id);
      this.checkCollected(id);
    }
  },

  loadPoetryDetail: function(id) {
    const that = this;
    const files = [
      // 元曲
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/元曲/yuanqu.json',
      
      // 全唐诗
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/全唐诗/poet.tang.0.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/全唐诗/唐诗三百首.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/全唐诗/唐诗补录.json',
      
      // 四书五经
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/四书五经/daxue.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/四书五经/mengzi.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/四书五经/zhongyong.json',
      
      // 宋词
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.0.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.1000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.2000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.3000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.4000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.5000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.6000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.7000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.8000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.9000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/ci.song.10000.json',
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/宋词/宋词三百首.json',
      
      // 幽梦影
      'https://raw.githubusercontent.com/chinese-poetry/chinese-poetry/master/幽梦影/youmengying.json'
    ];
    
    let foundPoetry = null;
    let checkedCount = 0;
    
    files.forEach(file => {
      wx.request({
        url: file,
        method: 'GET',
        success(res) {
          if (!foundPoetry && Array.isArray(res.data)) {
            const poetry = res.data.find(item => item.id === id);
            if (poetry) {
              foundPoetry = poetry;
              that.setData({
                poetry: poetry
              });
            }
          }
          checkedCount++;
        },
        fail(err) {
          console.error('加载诗词详情失败:', err);
          checkedCount++;
        }
      });
    });
  },

  goBack: function() {
    wx.navigateBack();
  },
  
  checkCollected: function(key) {
    const collected = wx.getStorageSync('collectedPoems') || [];
    const isCollected = collected.includes(key);
    this.setData({
      isCollected: isCollected
    });
  },
  
  toggleCollect: function() {
    const key = this.data.poetry.title || this.data.poetry.rhythmic;
    if (!key) return;
    
    const collected = wx.getStorageSync('collectedPoems') || [];
    const index = collected.indexOf(key);
    
    if (index > -1) {
      collected.splice(index, 1);
      this.setData({
        isCollected: false
      });
    } else {
      collected.push(key);
      this.setData({
        isCollected: true
      });
    }
    
    wx.setStorageSync('collectedPoems', collected);
  }
});