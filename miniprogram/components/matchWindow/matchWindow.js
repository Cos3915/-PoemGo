Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        if (newVal) {
          this.startMatching();
        }
      }
    },
    matchType: {
      type: String,
      value: ''
    },
    myAccount: {
      type: String,
      value: '我的账号'
    },
    myAvatar: {
      type: String,
      value: '/img/default-avatar.png'
    }
  },

  data: {
    opponentAccount: '',
    opponentAvatar: '',
    status: '正在匹配中...'
  },

  methods: {
    startMatching: function() {
      this.setData({
        opponentAccount: '',
        opponentAvatar: '',
        status: '正在匹配中...'
      });
      
      this.matchTimer = setTimeout(() => {
        this.setData({
          opponentAccount: '对手账号' + Math.floor(Math.random() * 1000),
          opponentAvatar: '/img/default-avatar.png',
          status: '匹配成功！'
        });
        
        setTimeout(() => {
          this.triggerEvent('matchSuccess');
        }, 1000);
      }, 3000);
    },

    onCancel: function() {
      if (this.matchTimer) {
        clearTimeout(this.matchTimer);
      }
      this.triggerEvent('cancel');
    },

    onUnload: function() {
      if (this.matchTimer) {
        clearTimeout(this.matchTimer);
      }
    }
  }
});