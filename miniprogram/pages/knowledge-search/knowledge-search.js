Page({
  data: {
    searchKeyword: '',
    searchResults: [],
    poetryDatabase: []
  },

  onLoad: function() {
    this.loadPoetryData();
  },

  onSearchInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  onSearch: function() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) return;
    
    this.performSearch(keyword);
  },

  loadPoetryData: function() {
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
    
    let mergedData = [];
    let loadedCount = 0;
    
    files.forEach(file => {
      wx.request({
        url: file,
        method: 'GET',
        success(res) {
          mergedData = mergedData.concat(res.data);
          loadedCount++;
          
          if (loadedCount === files.length) {
            that.setData({
              poetryDatabase: mergedData
            });
            console.log('诗词数据加载完成，共', mergedData.length, '条');
          }
        },
        fail(err) {
          console.error('加载诗词数据失败:', err);
          loadedCount++;
          
          if (loadedCount === files.length) {
            that.setData({
              poetryDatabase: mergedData
            });
            console.log('诗词数据加载完成，共', mergedData.length, '条');
          }
        }
      });
    });
  },

  performSearch: function(keyword) {
    const results = this.data.poetryDatabase.filter(item => 
      // 确保item有author和paragraphs字段，且paragraphs是数组
      item.author && item.paragraphs && Array.isArray(item.paragraphs) &&
      ((item.title && item.title.includes(keyword)) || 
       (item.rhythmic && item.rhythmic.includes(keyword)) ||
       item.author.includes(keyword) ||
       item.paragraphs.some(paragraph => paragraph && paragraph.includes(keyword)))
    );
    
    this.setData({
      searchResults: results
    });
  },

  onResultTap: function(e) {
    const author = e.currentTarget.dataset.author;
    const title = e.currentTarget.dataset.title;
    const content = e.currentTarget.dataset.content;
    
    const poetry = {
      author: author,
      title: title,
      paragraphs: content
    };
    
    wx.navigateTo({
      url: `/pages/poetry-detail/poetry-detail?poetry=${encodeURIComponent(JSON.stringify(poetry))}`
    });
  },

  goBack: function() {
    wx.navigateBack();
  }
});