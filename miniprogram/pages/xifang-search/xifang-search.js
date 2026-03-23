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
    const westernPoetry = [
      // William Shakespeare
      {
        author: 'William Shakespeare',
        title: 'Sonnet 18',
        lines: [
          'Shall I compare thee to a summer\'s day?',
          'Thou art more lovely and more temperate:',
          'Rough winds do shake the darling buds of May,',
          'And summer\'s lease hath all too short a date:',
          'Sometime too hot the eye of heaven shines,',
          'And often is his gold complexion dimm\'d;',
          'And every fair from fair sometime declines,',
          'By chance, or nature\'s changing course, untrimm\'d;',
          'But thy eternal summer shall not fade,',
          'Nor lose possession of that fair thou ow\'st;',
          'Nor shall Death brag thou wander\'st in his shade,',
          'When in eternal lines to time thou grow\'st;',
          'So long as men can breathe, or eyes can see,',
          'So long lives this, and this gives life to thee.'
        ]
      },
      {
        author: 'William Shakespeare',
        title: 'Sonnet 29',
        lines: [
          'When, in disgrace with fortune and men\'s eyes,',
          'I all alone beweep my outcast state,',
          'And trouble deaf heaven with my bootless cries,',
          'And look upon myself and curse my fate,',
          'Wishing me like to one more rich in hope,',
          'Featured like him, like him with friends possess\'d,',
          'Desiring this man\'s art, and that man\'s scope,',
          'With what I most enjoy contented least;',
          'Yet in these thoughts myself almost despising,',
          'Haply I think on thee, and then my state,',
          'Like to the lark at break of day arising',
          'From sullen earth, sings hymns at heaven\'s gate;',
          'For thy sweet love remember\'d such wealth brings,',
          'That then I scorn to change my state with kings.'
        ]
      },
      {
        author: 'William Shakespeare',
        title: 'Sonnet 116',
        lines: [
          'Let me not to the marriage of true minds',
          'Admit impediments. Love is not love',
          'Which alters when it alteration finds,',
          'Or bends with the remover to remove:',
          'O no! it is an ever-fixed mark',
          'That looks on tempests and is never shaken;',
          'It is the star to every wandering bark,',
          'Whose worth\'s unknown, although his height be taken.',
          'Love\'s not Time\'s fool, though rosy lips and cheeks',
          'Within his bending sickle\'s compass come:',
          'Love alters not with his brief hours and weeks,',
          'But bears it out even to the edge of doom.',
          'If this be error and upon me prov\'d,',
          'I never writ, nor no man ever lov\'d.'
        ]
      },
      
      // John Keats
      {
        author: 'John Keats',
        title: 'Ode to a Nightingale',
        lines: [
          'My heart aches, and a drowsy numbness pains',
          'My sense, as though of hemlock I had drunk,',
          'Or emptied some dull opiate to the drains',
          'One minute past, and Lethe-wards had sunk:',
          'Tis not through envy of thy happy lot,',
          'But being too happy in thine happiness,—',
          'That thou, light-winged Dryad of the trees,',
          'In some melodious plot',
          'Of beechen green, and shadows numberless,',
          'Singest of summer in full-throated ease.'
        ]
      },
      {
        author: 'John Keats',
        title: 'Ode on a Grecian Urn',
        lines: [
          'THOU still unravish\'d bride of quietness,',
          'Thou foster-child of Silence and slow Time,',
          'Sylvan historian, who canst thus express',
          'A flowery tale more sweetly than our rhyme:',
          'What leaf-fring\'d legend haunts about thy shape',
          'Of deities or mortals, or of both,',
          'In Tempe or the dales of Arcady?',
          'What men or gods are these? What maidens loth?',
          'What mad pursuit? What struggle to escape?',
          'What pipes and timbrels? What wild ecstasy?'
        ]
      },
      
      // Percy Bysshe Shelley
      {
        author: 'Percy Bysshe Shelley',
        title: 'Ode to the West Wind',
        lines: [
          'O wild West Wind, thou breath of Autumn\'s being,',
          'Thou, from whose unseen presence the leaves dead',
          'Are driven, like ghosts from an enchanter fleeing,',
          'Yellow, and black, and pale, and hectic red,',
          'Pestilence-stricken multitudes: O thou,',
          'Who chariotest to their dark wintry bed',
          'The winged seeds, where they lie cold and low,',
          'Each like a corpse within its grave, until',
          'Thine azure sister of the Spring shall blow',
          'Her clarion o\'er the dreaming earth, and fill',
          '(Driving sweet buds like flocks to feed in air)',
          'With living hues and odours plain and hill:'
        ]
      },
      
      // Lord Byron
      {
        author: 'Lord Byron',
        title: 'She Walks in Beauty',
        lines: [
          'She walks in beauty, like the night',
          'Of cloudless climes and starry skies;',
          'And all that\'s best of dark and bright',
          'Meet in her aspect and her eyes:',
          'Thus mellowed to that tender light',
          'Which heaven to gaudy day denies.',
          '',
          'One shade the more, one ray the less,',
          'Had half impaired the nameless grace',
          'Which waves in every raven tress,',
          'Or softly lightens o\'er her face;'
        ]
      },
      
      // Emily Dickinson
      {
        author: 'Emily Dickinson',
        title: 'I\'m Nobody! Who are you?',
        lines: [
          'I\'m Nobody! Who are you?',
          'Are you – Nobody – too?',
          'Then there\'s a pair of us!',
          'Don\'t tell! they\'d advertise – you know!',
          '',
          'How dreary – to be – Somebody!',
          'How public – like a Frog –',
          'To tell one\'s name – the livelong June –',
          'To an admiring Bog!'
        ]
      },
      {
        author: 'Emily Dickinson',
        title: 'Because I could not stop for Death',
        lines: [
          'Because I could not stop for Death –',
          'He kindly stopped for me –',
          'The Carriage held but just Ourselves –',
          'And Immortality.',
          '',
          'We slowly drove – He knew no haste',
          'And I had put away',
          'My labor and my leisure too,',
          'For His Civility –',
          '',
          'We passed the School, where Children strove',
          'At Recess – in the Ring –',
          'We passed the Fields of Gazing Grain –',
          'We passed the Setting Sun –'
        ]
      },
      
      // Robert Frost
      {
        author: 'Robert Frost',
        title: 'The Road Not Taken',
        lines: [
          'Two roads diverged in a yellow wood,',
          'And sorry I could not travel both',
          'And be one traveler, long I stood',
          'And looked down one as far as I could',
          'To where it bent in the undergrowth;',
          '',
          'Then took the other, as just as fair,',
          'And having perhaps the better claim,',
          'Because it was grassy and wanted wear;',
          'Though as for that the passing there',
          'Had worn them really about the same,',
          '',
          'And both that morning equally lay',
          'In leaves no step had trodden black.',
          'Oh, I kept the first for another day!',
          'Yet knowing how way leads on to way,',
          'I doubted if I should ever come back.',
          '',
          'I shall be telling this with a sigh',
          'Somewhere ages and ages hence:',
          'Two roads diverged in a wood, and I –',
          'I took the one less traveled by,',
          'And that has made all the difference.'
        ]
      },
      {
        author: 'Robert Frost',
        title: 'Stopping by Woods on a Snowy Evening',
        lines: [
          'Whose woods these are I think I know.',
          'His house is in the village though;',
          'He will not see me stopping here',
          'To watch his woods fill up with snow.',
          '',
          'My little horse must think it queer',
          'To stop without a farmhouse near',
          'Between the woods and frozen lake',
          'The darkest evening of the year.',
          '',
          'He gives his harness bells a shake',
          'To ask if there is some mistake.',
          'The only other sound\'s the sweep',
          'Of easy wind and downy flake.'
        ]
      },
      
      // Edgar Allan Poe
      {
        author: 'Edgar Allan Poe',
        title: 'The Raven',
        lines: [
          'Once upon a midnight dreary, while I pondered, weak and weary,',
          'Over many a quaint and curious volume of forgotten lore—',
          'While I nodded, nearly napping, suddenly there came a tapping,',
          'As of some one gently rapping, rapping at my chamber door.',
          '"\'Tis some visitor," I muttered, "tapping at my chamber door—',
          'Only this and nothing more."',
          '',
          'Ah, distinctly I remember it was in the bleak December;',
          'And each separate dying ember wrought its ghost upon the floor.',
          'Eagerly I wished the morrow;—vainly I had sought to borrow',
          'From my books surcease of sorrow—sorrow for the lost Lenore—',
          'For the rare and radiant maiden whom the angels name Lenore—',
          'Nameless here for evermore.'
        ]
      },
      
      // Walt Whitman
      {
        author: 'Walt Whitman',
        title: 'I Sing the Body Electric',
        lines: [
          'I sing the body electric,',
          'The armies of those I love engirth me and I engirth them,',
          'They will not let me off till I go with them, respond to them,',
          'And discorrupt them, and charge them full with the charge of the soul.',
          '',
          'Was it doubted that those who corrupt their own bodies conceal themselves?',
          'And if those who defile the living are as bad as they who defile the dead?',
          'And if the body does not do fully as much as the soul?',
          'And if the body were not the soul, what is the soul?'
        ]
      },
      
      // Arthur Rimbaud
      {
        author: 'Arthur Rimbaud',
        title: 'Le Bateau ivre',
        lines: [
          'Comme je descendais des Fleuves impassibles,',
          'Je ne me sentais plus guidé par les haleines.',
          'Des Peaux-Rouges criards les avaient pris pour cibles,',
          'Les ayant cloués nus aux poteaux de couleurs.',
          '',
          'J\'étais insouciant des flots en amont,',
          'Et je portais, sans faire de mon âme une offense,',
          'Des croyances sanglantes au soleil qui m\'offense.'
        ]
      },
      
      // Paul Verlaine
      {
        author: 'Paul Verlaine',
        title: 'Chanson d\'automne',
        lines: [
          'Les sanglots longs',
          'Des violons',
          'De l\'automne',
          'Blessent mon cœur',
          'D\'une langueur',
          'Monotone.',
          '',
          'Tout suffocant',
          'Et blême, quand',
          'Sonne l\'heure',
          'Je me souviens',
          'Des jours anciens',
          'Et je pleure.'
        ]
      },
      
      // Johann Wolfgang von Goethe
      {
        author: 'Johann Wolfgang von Goethe',
        title: 'Erlkönig',
        lines: [
          'Wer reitet so spät durch Nacht und Wind?',
          'Es ist der Vater mit seinem Kind;',
          'Er hat den Knaben wohl in dem Arm,',
          'Er faßt ihn sicher, er hält ihn warm.',
          '',
          '"Mein Sohn, was birgst du so bang dein Gesicht?"—',
          '"Siehst, Vater, du den Erlkönig nicht?',
          'Den Erlenkönig mit Kron\' und Schweif?"—',
          '"Mein Sohn, es ist ein Nebelstreif."'
        ]
      },
      
      // Heinrich Heine
      {
        author: 'Heinrich Heine',
        title: 'Die Lorelei',
        lines: [
          'Ich weiß nicht, was soll es bedeuten,',
          'Daß ich so traurig bin;',
          'Ein Märchen aus alten Zeiten,',
          'Das kommt mir nicht aus dem Sinn.',
          '',
          'Die Luft ist kühl und es dunkelt,',
          'Und ruhig fließt der Rhein;',
          'Der Gipfel des Berges funkelt',
          'Im Abendsonnenschein.'
        ]
      },
      
      // Alexander Pushkin
      {
        author: 'Alexander Pushkin',
        title: 'I loved you',
        lines: [
          'I loved you; and perhaps I love you still,',
          'The flame, perhaps, is not extinguished; yet',
          'It burns so quietly within my soul,',
          'No longer should you feel distressed by it.',
          '',
          'Silently and hopelessly I loved you,',
          'At times too jealous and at times too shy.',
          'God grant you find another who will love you',
          'As tenderly and truthfully as I.'
        ]
      },
      
      // Mikhail Lermontov
      {
        author: 'Mikhail Lermontov',
        title: 'The Poet',
        lines: [
          'The poet died!—the slave of honour,',
          'He fell, with his bold head unbent,',
          'Before the base crowd\'s obscure power,',
          'Under the blood-stained axe of the executioner.'
        ]
      },
      
      // William Blake
      {
        author: 'William Blake',
        title: 'The Tyger',
        lines: [
          'Tyger Tyger, burning bright,',
          'In the forests of the night;',
          'What immortal hand or eye,',
          'Could frame thy fearful symmetry?',
          '',
          'In what distant deeps or skies.',
          'Burnt the fire of thine eyes?',
          'On what wings dare he aspire?',
          'What the hand, dare seize the fire?'
        ]
      },
      
      // Sylvia Plath
      {
        author: 'Sylvia Plath',
        title: 'Daddy',
        lines: [
          'You do not do, you do not do',
          'Any more, black shoe',
          'In which I have lived like a foot',
          'For thirty years, poor and white,',
          'Barely daring to breathe or Achoo.',
          '',
          'Daddy, I have had to kill you.',
          'You died before I had time—',
          'Marble-heavy, a bag full of God,',
          'Ghastly statue with one gray toe',
          'Big as a Frisco seal'
        ]
      }
    ];
    
    this.setData({
      poetryDatabase: westernPoetry
    });
    console.log('西方诗歌数据加载完成，共', westernPoetry.length, '条');
  },

  performSearch: function(keyword) {
    const results = this.data.poetryDatabase.filter(item => 
      item.author && item.title && item.lines && Array.isArray(item.lines) &&
      (item.title.toLowerCase().includes(keyword.toLowerCase()) || 
       item.author.toLowerCase().includes(keyword.toLowerCase()) ||
       item.lines.some(line => line && line.toLowerCase().includes(keyword.toLowerCase())))
    );
    
    this.setData({
      searchResults: results
    });
  },

  onResultTap: function(e) {
    const author = e.currentTarget.dataset.author;
    const title = e.currentTarget.dataset.title;
    
    // 直接从搜索结果中获取完整数据
    const results = this.data.searchResults;
    const clickedPoetry = results.find(item => item.author === author && item.title === title);
    
    if (clickedPoetry) {
      wx.navigateTo({
        url: `/pages/poetry-detail/poetry-detail?poetry=${encodeURIComponent(JSON.stringify(clickedPoetry))}`
      });
    } else {
      wx.showToast({
        title: '诗歌数据不存在',
        icon: 'none'
      });
    }
  },

  goBack: function() {
    wx.navigateBack();
  }
});