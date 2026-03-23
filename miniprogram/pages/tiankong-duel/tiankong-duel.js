Page({
  data: {
    opponentAvatar: '/img/default-avatar.png',
    opponentName: '对手',
    opponentScore: 0,
    myAvatar: '/img/default-avatar.png',
    myName: '我',
    myScore: 0,
    currentRound: 1,
    poetry: {},
    answer: '',
    originalPoetry: {},
    poetryDatabase: [],
    usedPoetryIndexes: [],
    showResult: false,
    resultMessage: ''
  },

  onLoad: function(options) {
    this.loadPoetryData();
    this.startRound();
  },

  loadPoetryData: function() {
    const poetryDatabase = [
      // 唐诗三百首
      {
        title: '静夜思',
        author: '李白',
        paragraphs: ['床前明月光', '疑是地上霜', '举头望明月', '低头思故乡']
      },
      {
        title: '望庐山瀑布',
        author: '李白',
        paragraphs: ['日照香炉生紫烟', '遥看瀑布挂前川', '飞流直下三千尺', '疑是银河落九天']
      },
      {
        title: '春晓',
        author: '孟浩然',
        paragraphs: ['春眠不觉晓', '处处闻啼鸟', '夜来风雨声', '花落知多少']
      },
      {
        title: '登鹳雀楼',
        author: '王之涣',
        paragraphs: ['白日依山尽', '黄河入海流', '欲穷千里目', '更上一层楼']
      },
      {
        title: '枫桥夜泊',
        author: '张继',
        paragraphs: ['月落乌啼霜满天', '江枫渔火对愁眠', '姑苏城外寒山寺', '夜半钟声到客船']
      },
      {
        title: '在狱咏蝉',
        author: '骆宾王',
        paragraphs: ['西陆蝉声唱，南冠客思侵。', '那堪玄鬓影，来对白头吟。', '露重飞难进，风多响易沉。', '无人信高洁，谁为表予心。']
      },
      {
        title: '登幽州台歌',
        author: '陈子昂',
        paragraphs: ['前不见古人，后不见来者。', '念天地之悠悠，独怆然而涕下。']
      },
      {
        title: '将进酒',
        author: '李白',
        paragraphs: ['君不见黄河之水天上来，奔流到海不复回。', '君不见高堂明镜悲白发，朝如青丝暮成雪。', '人生得意须尽欢，莫使金樽空对月。', '天生我材必有用，千金散尽还复来。']
      },
      {
        title: '出塞',
        author: '王昌龄',
        paragraphs: ['秦时明月汉时关，万里长征人未还。', '但使龙城飞将在，不教胡马度阴山。']
      },
      {
        title: '凉州词',
        author: '王之涣',
        paragraphs: ['黄河远上白云间，一片孤城万仞山。', '羌笛何须怨杨柳，春风不度玉门关。']
      },
      {
        title: '枫桥夜泊',
        author: '张继',
        paragraphs: ['月落乌啼霜满天，江枫渔火对愁眠。', '姑苏城外寒山寺，夜半钟声到客船。']
      },
      {
        title: '锦瑟',
        author: '李商隐',
        paragraphs: ['锦瑟无端五十弦，一弦一柱思华年。', '庄生晓梦迷蝴蝶，望帝春心托杜鹃。', '沧海月明珠有泪，蓝田日暖玉生烟。', '此情可待成追忆，只是当时已惘然。']
      },
      {
        title: '夜雨寄北',
        author: '李商隐',
        paragraphs: ['君问归期未有期，巴山夜雨涨秋池。', '何当共剪西窗烛，却话巴山夜雨时。']
      },
      {
        title: '无题',
        author: '李商隐',
        paragraphs: ['相见时难别亦难，东风无力百花残。', '春蚕到死丝方尽，蜡炬成灰泪始干。', '晓镜但愁云鬓改，夜吟应觉月光寒。', '蓬山此去无多路，青鸟殷勤为探看。']
      },
      {
        title: '嫦娥',
        author: '李商隐',
        paragraphs: ['云母屏风烛影深，长河渐落晓星沉。', '嫦娥应悔偷灵药，碧海青天夜夜心。']
      },
      {
        title: '赤壁',
        author: '杜牧',
        paragraphs: ['折戟沉沙铁未销，自将磨洗认前朝。', '东风不与周郎便，铜雀春深锁二乔。']
      },
      {
        title: '泊秦淮',
        author: '杜牧',
        paragraphs: ['烟笼寒水月笼沙，夜泊秦淮近酒家。', '商女不知亡国恨，隔江犹唱后庭花。']
      },
      {
        title: '秋夕',
        author: '杜牧',
        paragraphs: ['银烛秋光冷画屏，轻罗小扇扑流萤。', '天阶夜色凉如水，坐看牵牛织女星。']
      },
      {
        title: '望岳',
        author: '杜甫',
        paragraphs: ['岱宗夫如何？齐鲁青未了。', '造化钟神秀，阴阳割昏晓。', '荡胸生曾云，决眦入归鸟。', '会当凌绝顶，一览众山小。']
      },
      {
        title: '春望',
        author: '杜甫',
        paragraphs: ['国破山河在，城春草木深。', '感时花溅泪，恨别鸟惊心。', '烽火连三月，家书抵万金。', '白头搔更短，浑欲不胜簪。']
      },
      {
        title: '茅屋为秋风所破歌',
        author: '杜甫',
        paragraphs: ['八月秋高风怒号，卷我屋上三重茅。', '茅飞渡江洒江郊，高者挂罥长林梢，下者飘转沉塘坳。', '南村群童欺我老无力，忍能对面为盗贼。', '公然抱茅入竹去，唇焦口燥呼不得，归来倚杖自叹息。']
      },
      {
        title: '登高',
        author: '杜甫',
        paragraphs: ['风急天高猿啸哀，渚清沙白鸟飞回。', '无边落木萧萧下，不尽长江滚滚来。', '万里悲秋常作客，百年多病独登台。', '艰难苦恨繁霜鬓，潦倒新停浊酒杯。']
      },
      {
        title: '蜀相',
        author: '杜甫',
        paragraphs: ['丞相祠堂何处寻，锦官城外柏森森。', '映阶碧草自春色，隔叶黄鹂空好音。', '三顾频烦天下计，两朝开济老臣心。', '出师未捷身先死，长使英雄泪满襟。']
      },
      {
        title: '黄鹤楼',
        author: '崔颢',
        paragraphs: ['昔人已乘黄鹤去，此地空余黄鹤楼。', '黄鹤一去不复返，白云千载空悠悠。', '晴川历历汉阳树，芳草萋萋鹦鹉洲。', '日暮乡关何处是？烟波江上使人愁。']
      },
      {
        title: '送杜少府之任蜀州',
        author: '王勃',
        paragraphs: ['城阙辅三秦，风烟望五津。', '与君离别意，同是宦游人。', '海内存知己，天涯若比邻。', '无为在歧路，儿女共沾巾。']
      },
      {
        title: '九月九日忆山东兄弟',
        author: '王维',
        paragraphs: ['独在异乡为异客，每逢佳节倍思亲。', '遥知兄弟登高处，遍插茱萸少一人。']
      },
      {
        title: '送元二使安西',
        author: '王维',
        paragraphs: ['渭城朝雨浥轻尘，客舍青青柳色新。', '劝君更尽一杯酒，西出阳关无故人。']
      },
      {
        title: '山居秋暝',
        author: '王维',
        paragraphs: ['空山新雨后，天气晚来秋。', '明月松间照，清泉石上流。', '竹喧归浣女，莲动下渔舟。', '随意春芳歇，王孙自可留。']
      },
      {
        title: '望天门山',
        author: '李白',
        paragraphs: ['天门中断楚江开，碧水东流至此回。', '两岸青山相对出，孤帆一片日边来。']
      },
      {
        title: '早发白帝城',
        author: '李白',
        paragraphs: ['朝辞白帝彩云间，千里江陵一日还。', '两岸猿声啼不住，轻舟已过万重山。']
      },
      {
        title: '黄鹤楼送孟浩然之广陵',
        author: '李白',
        paragraphs: ['故人西辞黄鹤楼，烟花三月下扬州。', '孤帆远影碧空尽，唯见长江天际流。']
      },
      {
        title: '赠汪伦',
        author: '李白',
        paragraphs: ['李白乘舟将欲行，忽闻岸上踏歌声。', '桃花潭水深千尺，不及汪伦送我情。']
      },
      {
        title: '闻王昌龄左迁龙标遥有此寄',
        author: '李白',
        paragraphs: ['杨花落尽子规啼，闻道龙标过五溪。', '我寄愁心与明月，随君直到夜郎西。']
      },
      {
        title: '望洞庭',
        author: '刘禹锡',
        paragraphs: ['湖光秋月两相和，潭面无风镜未磨。', '遥望洞庭山水翠，白银盘里一青螺。']
      },
      {
        title: '浪淘沙',
        author: '刘禹锡',
        paragraphs: ['九曲黄河万里沙，浪淘风簸自天涯。', '如今直上银河去，同到牵牛织女家。']
      },
      {
        title: '酬乐天扬州初逢席上见赠',
        author: '刘禹锡',
        paragraphs: ['巴山楚水凄凉地，二十三年弃置身。', '怀旧空吟闻笛赋，到乡翻似烂柯人。', '沉舟侧畔千帆过，病树前头万木春。', '今日听君歌一曲，暂凭杯酒长精神。']
      },
      {
        title: '江雪',
        author: '柳宗元',
        paragraphs: ['千山鸟飞绝，万径人踪灭。', '孤舟蓑笠翁，独钓寒江雪。']
      },
      {
        title: '渔翁',
        author: '柳宗元',
        paragraphs: ['渔翁夜傍西岩宿，晓汲清湘燃楚竹。', '烟销日出不见人，欸乃一声山水绿。', '回看天际下中流，岩上无心云相逐。']
      },
      {
        title: '寻隐者不遇',
        author: '贾岛',
        paragraphs: ['松下问童子，言师采药去。', '只在此山中，云深不知处。']
      },
      {
        title: '题李凝幽居',
        author: '贾岛',
        paragraphs: ['闲居少邻并，草径入荒园。', '鸟宿池边树，僧敲月下门。', '过桥分野色，移石动云根。', '暂去还来此，幽期不负言。']
      },
      {
        title: '乐游原',
        author: '李商隐',
        paragraphs: ['向晚意不适，驱车登古原。', '夕阳无限好，只是近黄昏。']
      },
      {
        title: '夜雨寄北',
        author: '李商隐',
        paragraphs: ['君问归期未有期，巴山夜雨涨秋池。', '何当共剪西窗烛，却话巴山夜雨时。']
      },
      {
        title: '无题',
        author: '李商隐',
        paragraphs: ['昨夜星辰昨夜风，画楼西畔桂堂东。', '身无彩凤双飞翼，心有灵犀一点通。', '隔座送钩春酒暖，分曹射覆蜡灯红。', '嗟余听鼓应官去，走马兰台类断蓬。']
      },
      {
        title: '锦瑟',
        author: '李商隐',
        paragraphs: ['锦瑟无端五十弦，一弦一柱思华年。', '庄生晓梦迷蝴蝶，望帝春心托杜鹃。', '沧海月明珠有泪，蓝田日暖玉生烟。', '此情可待成追忆，只是当时已惘然。']
      },
      {
        title: '金缕衣',
        author: '杜秋娘',
        paragraphs: ['劝君莫惜金缕衣，劝君惜取少年时。', '花开堪折直须折，莫待无花空折枝。']
      },
      {
        title: '凉州词',
        author: '王翰',
        paragraphs: ['葡萄美酒夜光杯，欲饮琵琶马上催。', '醉卧沙场君莫笑，古来征战几人回。']
      },
      {
        title: '咏柳',
        author: '贺知章',
        paragraphs: ['碧玉妆成一树高，万条垂下绿丝绦。', '不知细叶谁裁出，二月春风似剪刀。']
      },
      {
        title: '回乡偶书',
        author: '贺知章',
        paragraphs: ['少小离家老大回，乡音无改鬓毛衰。', '儿童相见不相识，笑问客从何处来。']
      },
      {
        title: '芙蓉楼送辛渐',
        author: '王昌龄',
        paragraphs: ['寒雨连江夜入吴，平明送客楚山孤。', '洛阳亲友如相问，一片冰心在玉壶。']
      },
      {
        title: '江畔独步寻花',
        author: '杜甫',
        paragraphs: ['黄四娘家花满蹊，千朵万朵压枝低。', '留连戏蝶时时舞，自在娇莺恰恰啼。']
      },
      {
        title: '题西林壁',
        author: '苏轼',
        paragraphs: ['横看成岭侧成峰，远近高低各不同。', '不识庐山真面目，只缘身在此山中。']
      },
      {
        title: '饮湖上初晴后雨',
        author: '苏轼',
        paragraphs: ['水光潋滟晴方好，山色空蒙雨亦奇。', '欲把西湖比西子，淡妆浓抹总相宜。']
      },
      {
        title: '题临安邸',
        author: '林升',
        paragraphs: ['山外青山楼外楼，西湖歌舞几时休。', '暖风熏得游人醉，直把杭州作汴州。']
      },
      {
        title: '游园不值',
        author: '叶绍翁',
        paragraphs: ['应怜屐齿印苍苔，小扣柴扉久不开。', '春色满园关不住，一枝红杏出墙来。']
      },
      {
        title: '小池',
        author: '杨万里',
        paragraphs: ['泉眼无声惜细流，树阴照水爱晴柔。', '小荷才露尖尖角，早有蜻蜓立上头。']
      },
      {
        title: '晓出净慈寺送林子方',
        author: '杨万里',
        paragraphs: ['毕竟西湖六月中，风光不与四时同。', '接天莲叶无穷碧，映日荷花别样红。']
      },
      {
        title: '四时田园杂兴',
        author: '范成大',
        paragraphs: ['梅子金黄杏子肥，麦花雪白菜花稀。', '日长篱落无人过，唯有蜻蜓蛱蝶飞。']
      },
      {
        title: '秋夜将晓出篱门迎凉有感',
        author: '陆游',
        paragraphs: ['三万里河东入海，五千仞岳上摩天。', '遗民泪尽胡尘里，南望王师又一年。']
      },
      {
        title: '示儿',
        author: '陆游',
        paragraphs: ['死去元知万事空，但悲不见九州同。', '王师北定中原日，家祭无忘告乃翁。']
      },
      {
        title: '题壁',
        author: '无名氏',
        paragraphs: ['一团茅草乱蓬蓬，蓦地烧天蓦地空。', '争似满炉煨榾柮，漫腾腾地暖烘烘。']
      }
    ];
    
    this.setData({
      poetryDatabase: poetryDatabase
    });
  },

  startRound: function() {
    const poetryDatabase = this.data.poetryDatabase;
    const usedPoetryIndexes = this.data.usedPoetryIndexes;
    
    const availableIndexes = [];
    for (let i = 0; i< poetryDatabase.length; i++) {
      if (!usedPoetryIndexes.includes(i)) {
        availableIndexes.push(i);
      }
    }
    
    if (availableIndexes.length === 0) {
      this.setData({
        usedPoetryIndexes: []
      });
      this.startRound();
      return;
    }
    
    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const selectedPoetry = poetryDatabase[randomIndex];
    
    const modifiedPoetry = JSON.parse(JSON.stringify(selectedPoetry));
    
    const paragraphIndex = Math.floor(Math.random() * modifiedPoetry.paragraphs.length);
    const line = modifiedPoetry.paragraphs[paragraphIndex];
    
    if (line.length < 3) {
      this.startRound();
      return;
    }
    
    const charIndex = Math.floor(Math.random() * (line.length - 1));
    
    const originalChars = line.substring(charIndex, charIndex + 2);
    const blankLine = line.slice(0, charIndex) + '____' + line.slice(charIndex + 2);
    
    modifiedPoetry.paragraphs[paragraphIndex] = blankLine;
    
    this.setData({
      poetry: modifiedPoetry,
      originalPoetry: {
        ...selectedPoetry,
        blankChar: originalChars,
        blankLineIndex: paragraphIndex,
        blankCharIndex: charIndex
      },
      answer: '',
      usedPoetryIndexes: [...usedPoetryIndexes, randomIndex]
    });
  },

  onAnswerChange: function(e) {
    this.setData({
      answer: e.detail.value
    });
  },

  onSubmit: function() {
    const answer = this.data.answer.trim();
    if (!answer) {
      wx.showToast({
        title: '请输入答案',
        icon: 'none'
      });
      return;
    }
    
    const originalChar = this.data.originalPoetry.blankChar;
    
    if (answer === originalChar) {
      this.setData({
        myScore: this.data.myScore + 5
      });
      wx.showToast({
        title: '回答正确！+5分',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '回答错误，正确答案是：' + originalChar,
        icon: 'none',
        duration: 2000
      });
    }
    
    this.simulateOpponentAnswer();
  },

  simulateOpponentAnswer: function() {
    const that = this;
    setTimeout(function() {
      const isCorrect = Math.random() >0.5;
      
      if (isCorrect) {
        that.setData({
          opponentScore: that.data.opponentScore + 5
        });
      }
      
      setTimeout(function() {
        that.nextRound();
      }, 1000);
    }, 1500);
  },

  nextRound: function() {
    const currentRound = this.data.currentRound + 1;
    
    if (currentRound<= 10) {
      this.setData({
        currentRound: currentRound
      });
      this.startRound();
    } else {
      this.endGame();
    }
  },

  endGame: function() {
    const myScore = this.data.myScore;
    const opponentScore = this.data.opponentScore;
    let message = '';
    
    if (myScore > opponentScore) {
      message = `您获胜！\n得分：${myScore} - ${opponentScore}`;
    } else if (myScore< opponentScore) {
      message = `对手获胜！\n得分：${myScore} - ${opponentScore}`;
    } else {
      message = `平局！\n得分：${myScore} - ${opponentScore}`;
    }
    
    this.setData({
      showResult: true,
      resultMessage: message
    });
  },
  
  onResultConfirm: function() {
    wx.navigateBack();
  }
});