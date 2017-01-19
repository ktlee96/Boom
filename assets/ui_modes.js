Game.UIMode = {};
Game.UIMode.DEFAULT_COLOR_FG = '#fff';
Game.UIMode.DEFAULT_COLOR_BG = '#000';
Game.UIMode.DEFAULT_COLOR_STR = '%c{'+Game.UIMode.DEFAULT_COLOR_FG+'}%b{'+Game.UIMode.DEFAULT_COLOR_BG+'}';

Game.UIMode.gameStart = {
  enter: function () {
    //console.log('game starting');
    Game.Message.send("Welcome to WSRL");
    Game.refresh();
  },
  exit: function () {
    Game.refresh();
  },
  render: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    display.drawText(1,1,"game start",fg,bg);
    display.drawText(1,3,"press any key to continue",fg,bg);
  },
  handleInput: function (inputType,inputData) {
    if (inputData.charCode !== 0) { // ignore the various modding keys - control, shift, etc.
      Game.switchUiMode(Game.UIMode.gamePersistence);
    }
  }
};

Game.UIMode.gamePersistence = {
  RANDOM_SEED_KEY: 'gameRandomSeed',
  enter: function () {
    Game.refresh();
    //console.log('game persistence');
  },
  exit: function () {
    Game.refresh();
  },
  render: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    display.drawText(1,3,"press S to save the current game, L to load the saved game, or N start a new one",fg,bg);
  },
  handleInput: function (inputType,inputData) {

    var inputChar = String.fromCharCode(inputData.charCode);
    if (inputChar == 'S') { // ignore the various modding keys - control, shift, etc.
      this.saveGame();
    } else if (inputChar == 'L') {
      this.restoreGame();
    } else if (inputChar == 'N') {
      this.newGame();
    }
  },
  saveGame: function () {
    if (this.localStorageAvailable()) {
      Game.DATASTORE.GAME_PLAY = Game.UIMode.gamePlay.attr;
      window.localStorage.setItem(Game._PERSISTANCE_NAMESPACE, JSON.stringify(Game.DATASTORE));
      Game.switchUiMode(Game.UIMode.gamePlay);
    }
  },
  restoreGame: function () {
    if (this.localStorageAvailable()) {
      var json_state_data = window.localStorage.getItem(Game._PERSISTANCE_NAMESPACE);
      var state_data = JSON.parse(json_state_data);

      this._resetGameDataStructures();

      // game level stuff
      Game.setRandomSeed(state_data[this.RANDOM_SEED_KEY]);

      // maps
      for (var mapId in state_data.MAP) {
        if (state_data.MAP.hasOwnProperty(mapId)) {
          var mapAttr = JSON.parse(state_data.MAP[mapId]);
          // console.log("restoring map "+mapId+" with attributes:");
          // console.dir(mapAttr);
          Game.DATASTORE.MAP[mapId] = new Game.Map(mapAttr._mapTileSetName);
          Game.DATASTORE.MAP[mapId].fromJSON(state_data.MAP[mapId]);
        }
      }

      // entities
      for (var entityId in state_data.ENTITY) {
        if (state_data.ENTITY.hasOwnProperty(entityId)) {
          var entAttr = JSON.parse(state_data.ENTITY[entityId]);
          Game.DATASTORE.ENTITY[entityId] = Game.EntityGenerator.create(entAttr._generator_template_key);
          Game.DATASTORE.ENTITY[entityId].fromJSON(state_data.ENTITY[entityId]);
        }
      }

      for (var itemId in state_data.ITEM) {
         if (state_data.ITEM.hasOwnProperty(itemId)) {
           var itemAttr = JSON.parse(state_data.ITEM[itemId]);
           var newI = Game.ItemGenerator.create(itemAttr._generator_template_key,itemAttr._id);
           Game.DATASTORE.ITEM[itemId] = newI;
           Game.DATASTORE.ITEM[itemId].fromJSON(state_data.ITEM[itemId]);
         }
       }
       for (var bombId in state_data.BOMB) {
          if (state_data.BOMB.hasOwnProperty(bombId)) {
            var bombAttr = JSON.parse(state_data.BOMB[bombId]);
            var newI = Game.BombGenerator.create(bombAttr._generator_template_key,bombAttr._id);
            Game.DATASTORE.BOMB[bombId] = newI;
            Game.DATASTORE.BOMB[bombId].fromJSON(state_data.BOMB[bombId]);
          }
        }

      // game play
      Game.UIMode.gamePlay.attr = state_data.GAME_PLAY;

      Game.switchUiMode(Game.UIMode.gamePlay);
    }
  },
  newGame: function () {
    this._resetGameDataStructures();
    Game.setRandomSeed(5 + Math.floor(Game.TRANSIENT_RNG.getUniform()*100000));
    Game.UIMode.gamePlay.setupNewGame();
    Game.switchUiMode(Game.UIMode.gamePlay);
  },
  _resetGameDataStructures: function () {
    Game.DATASTORE = {};
    Game.DATASTORE.MAP = {};
    Game.DATASTORE.ENTITY = {};
    Game.DATASTORE.ITEM = {};
    Game.DATASTORE.BOMB= {};
  },
  localStorageAvailable: function () { // NOTE: see https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  	try {
  		var x = '__storage_test__';
  		window.localStorage.setItem( x, x);
  		window.localStorage.removeItem(x);
  		return true;
  	}
  	catch(e) {
      Game.Message.send('Sorry, no local data storage is available for this browser');
  		return false;
  	}
  },
  BASE_toJSON: function(state_hash_name) {
    var state = this.attr;
    if (state_hash_name) {
      state = this[state_hash_name];
    }
    var json = JSON.stringify(state);

    return json;
  },
  BASE_fromJSON: function (json,state_hash_name) {
    var using_state_hash = 'attr';
    if (state_hash_name) {
      using_state_hash = state_hash_name;
    }
    this[using_state_hash] = JSON.parse(json);
  }
};

Game.UIMode.gamePlay = {
  attr: {
    _mapId: '',
    _cameraX: 100,
    _cameraY: 100,
    _avatarId: ''
  },
  JSON_KEY: 'uiMode_gamePlay',
  enter: function () {
    //console.log('game playing');
    Game.Message.clear();
    if (this.attr._avatarId) {
    //  this.setCameraToAvatar();
    }
    Game.refresh();
  },
  exit: function () {
    Game.refresh();
  },
  getMap: function () {
    return Game.DATASTORE.MAP[this.attr._mapId];
  },
  setMap: function (m) {
    this.attr._mapId = m.getId();
  },
  getAvatar: function () {
    return Game.DATASTORE.ENTITY[this.attr._avatarId];
  },
  setAvatar: function (a) {
    this.attr._avatarId = a.getId();
  },
  render: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    this.getMap().renderOn(display,38,10);
  },
  renderAvatarInfo: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    display.drawText(1,2,"avatar x: "+this.getAvatar().getX(),fg,bg); // DEV
    display.drawText(1,3,"avatar y: "+this.getAvatar().getY(),fg,bg); // DEV
  },
  moveAvatar: function (dx,dy) {
    if (this.getAvatar().tryWalk(this.getMap(),dx,dy)) {
      this.setCameraToAvatar();
    }
  },
  moveCamera: function (dx,dy) {
    this.setCamera(this.attr._cameraX + dx,this.attr._cameraY + dy);
  },
  setCamera: function (sx,sy) {
    this.attr._cameraX = Math.min(Math.max(0,sx),this.getMap().getWidth());
    this.attr._cameraY = Math.min(Math.max(0,sy),this.getMap().getHeight());
    Game.refresh();
  },
  setCameraToAvatar: function () {
    this.setCamera(this.getAvatar().getX(),this.getAvatar().getY());
  },
  handleInput: function (inputType,inputData) {
    var pressedKey = String.fromCharCode(inputData.charCode);
    Game.Message.send("you pressed the '"+String.fromCharCode(inputData.charCode)+"' key");
    Game.renderDisplayMessage();
    if (inputType == 'keypress') {
      if (inputData.key == 'Enter') {
        Game.switchUiMode(Game.UIMode.gameWin);
        return;
      } else if (pressedKey == '1') {
        this.moveAvatar(-1,1);
      } else if (pressedKey == 's') {
        this.moveAvatar(0,1);
      } else if (pressedKey == '3') {
        this.moveAvatar(1,1);
      } else if (pressedKey == 'a') {
        this.moveAvatar(-1,0);
      } else if (pressedKey == '5') {
        // do nothing / stay still
      } else if (pressedKey == 'd') {
        this.moveAvatar(1,0);
      } else if (pressedKey == '7') {
        this.moveAvatar(-1,-1);
      } else if (pressedKey == 'w') {
        this.moveAvatar(0,-1);
      } else if (pressedKey == '9') {
        this.moveAvatar(1,-1);
      } else if (pressedKey == ' ') {
        var b = Game.BombGenerator.create('bomb');
        b.setMap(this.getMap());



        this.getMap().addBomb(b,this.getAvatar().getPos());



      }else if (pressedKey == 'p') {
        this.getMap().clearFire();
        console.dir (this.getMap().attr._bombsByLocation);
        for (var a in this.getMap().attr._bombsByLocation) {
          console.dir(a);
          var b = this.getMap().attr._bombsByLocation[a];
          console.dir (b);
          b.explode();
        }
      }
    }
    else if (inputType == 'keydown') {
      if (inputData.keyCode == 27) { // 'Escape'
        Game.switchUiMode(Game.UIMode.gameLose);
      }
      else if (inputData.keyCode == 187) { // '='
        Game.switchUiMode(Game.UIMode.gamePersistence);
      }
    }
  },
  setupNewGame: function () {
    this.setMap(new Game.Map('caves1'));
    this.setAvatar(Game.EntityGenerator.create('avatar'));

    this.getMap().addEntity(this.getAvatar(),this.getMap().getRandomWalkableLocation());
    this.setCameraToAvatar();

    // dev code - just add some entities to the map
    for (var ecount = 0; ecount < 40; ecount++) {
      this.getMap().addEntity(Game.EntityGenerator.create('moss'),this.getMap().getRandomWalkableLocation());
    }

  },
  toJSON: function() {
    return Game.UIMode.gamePersistence.BASE_toJSON.call(this);
  },
  fromJSON: function (json) {
    Game.UIMode.gamePersistence.BASE_fromJSON.call(this,json);
  }
};

Game.UIMode.gameWin = {
  enter: function () {
    console.log('game winning');
  },
  exit: function () {
  },
  render: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    display.drawText(1,1,"You WON!!!!",fg,bg);
  },
  handleInput: function (inputType,inputData) {
    Game.Message.clear();
  }
};

Game.UIMode.gameLose = {
  enter: function () {
    console.log('game losing');
  },
  exit: function () {
  },
  render: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    display.drawText(1,1,"You lost :(",fg,bg);
  },
  handleInput: function (inputType,inputData) {
    Game.Message.clear();
  }
};
