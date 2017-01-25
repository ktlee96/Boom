Game.UIMode = {};
Game.UIMode.DEFAULT_COLOR_FG = '#fff';
Game.UIMode.DEFAULT_COLOR_BG = '#000';
Game.UIMode.DEFAULT_COLOR_STR = '%c{'+Game.UIMode.DEFAULT_COLOR_FG+'}%b{'+Game.UIMode.DEFAULT_COLOR_BG+'}';
Game.UIMode.maps = '';

//#############################################################################################################################
//#############################################################################################################################

Game.UIMode.gameStart = {
  enter: function () {
    Game.Message.clear();
    Game.Message.send("press [shift] to continue");
    Game.refresh();
  },
  exit: function () {
    Game.refresh();
  },
  render: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    var baseLine = 4;
    display.drawText(1,1+baseLine,"%c{#000}.%c{} ________   ________   ________   _____ ______    ___       ");
    display.drawText(1,2+baseLine,"%c{#000}.%c{}|\\   __  \\ |\\   __  \\ |\\   __  \\ |\\   _ \\  _   \\ |\\  \\      ");
    display.drawText(1,3+baseLine,"%c{#000}.%c{}\\ \\  \\|\\ /_\\ \\  \\|\\  \\\\ \\  \\|\\  \\\\ \\  \\\\\\__\\ \\  \\\\ \\  \\     ");
    display.drawText(1,4+baseLine,"%c{#000}.%c{} \\ \\   __  \\\\ \\  \\\\\\  \\\\ \\  \\\\\\  \\\\ \\  \\\\|__| \\  \\\\ \\  \\    ");
    display.drawText(1,5+baseLine,"%c{#000}.%c{}  \\ \\  \\|\\  \\\\ \\  \\\\\\  \\\\ \\  \\\\\\  \\\\ \\  \\    \\ \\  \\\\ \\__\\   ");
    display.drawText(1,6+baseLine,"%c{#000}.%c{}   \\ \\_______\\\\ \\_______\\\\ \\_______\\\\ \\__\\    \\ \\__\\\\|__|   ");
    display.drawText(1,7+baseLine,"%c{#000}.%c{}    \\|_______| \\|_______| \\|_______| \\|__|     \\|__|    ___ ");
    display.drawText(1,8+baseLine,"%c{#000}.%c{}                                                       |\\__\\");
    display.drawText(1,9+baseLine,"%c{#000}.%c{}                                                       \\|__|" );
    display.drawText(1,20,"%c{#000}.%c{}                                         By: D.Lee & H.Sheng",fg,bg);
  },
  handleInput: function (inputType,inputData) {
    if (inputData.keyCode == ROT.VK_SHIFT) { // ignore the various modding keys - control, shift, etc.
      Game.switchUiMode(Game.UIMode.gameInitial);
    }
  }
};

//#############################################################################################################################
//#############################################################################################################################

Game.UIMode.gameInitial = {
  RANDOM_SEED_KEY: 'gameRandomSeed',
  enter: function () {
    Game.Message.clear();
    Game.refresh();
  },
  exit: function () {
    Game.refresh();
  },
  render: function (display) {
    display.drawText(1,3,"press [ctrl] to view game controls");
    display.drawText(1,4,"press [space] to start a new game");
  },
  handleInput: function (inputType,inputData) {
    if (inputData.keyCode == ROT.VK_CONTROL) {
      Game.switchUiMode(Game.UIMode.gameMenu)
    }
    else if (inputData.keyCode == ROT.VK_SPACE) {
      Game.switchUiMode(Game.UIMode.gameMap);
      // this.newGame();
    }
  },
  // newGame: function () {
  //   this._resetGameDataStructures();
  //   Game.setRandomSeed(5 + Math.floor(Game.TRANSIENT_RNG.getUniform()*100000));
  //   Game.UIMode.gamePlay.setupNewGame();
  //   Game.switchUiMode(Game.UIMode.gamePlay);
  // },

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
};

//#############################################################################################################################
//#############################################################################################################################

Game.UIMode.gameMap = {
  enter: function () {
    Game.Message.send("Select the map mode you wish to play")
    Game.refresh();
  },
  exit: function () {
    Game.refresh();
  },
  render: function (display) {
    display.drawText(1,1,"[1] = Forest");
    display.drawText(1,3,"[2] = Mountain");
    display.drawText(1,5,"[3] = City");
  },
  handleInput: function (inputType,inputData) {
    if (inputData.keyCode == ROT.VK_1) { // ignore the various modding keys - control, shift, etc.
      Game.UIMode.maps = 'caves1';
      this.newGame();
    } else if (inputData.keyCode == ROT.VK_2) { // ignore the various modding keys - control, shift, etc.
      Game.UIMode.maps = 'caves2';
      this.newGame();
    } else if (inputData.keyCode == ROT.VK_3) { // ignore the various modding keys - control, shift, etc.
      Game.UIMode.maps = 'caves3';
      this.newGame();
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
  }
};


//#############################################################################################################################
//#############################################################################################################################

Game.UIMode.gameMenu = {
  enter: function () {
    Game.Message.clear();
    Game.refresh();
    Game.Message.send("press any key to go back");
  },
  exit: function () {
    Game.refresh();
  },
  render: function (display) {
    display.drawText(1,1,"Avatar1 Controls");
    display.drawText(2,3,"Moving Keys:")
    display.drawText(5,5,"a");
    display.drawText(7,5,"d");
    display.drawText(6,4,"w");
    display.drawText(6,5,"s");

    display.drawText(1,7,"Drop Bomb: 1");
    display.drawText(1,8,"Detonate Bomb: 2");

    display.drawText(25,1,"Avatar2 Controls");
    display.drawText(25,2,"Left: ArrowLeft");
    display.drawText(25,3,"Right: ArrowRight");
    display.drawText(25,4,"Up: ArrowUp");
    display.drawText(25,5,"Down: ArrowDown");
    display.drawText(25,6,"Drop Bomb: ,");
    display.drawText(25,7,"Detonate Bomb: .");

  },
  handleInput: function (inputType,inputData) {
    if (inputData.charCode !== 0) { // ignore the various modding keys - control, shift, etc.
      Game.switchUiMode(Game.UIMode.gameInitial);
    }
  }
};

//#############################################################################################################################
//#############################################################################################################################

Game.UIMode.gamePlay = {
  attr: {
    _mapId: '',
    _cameraX: 100,
    _cameraY: 100,
    _avatarId: '',
    _avatar2Id: '',
  },
  JSON_KEY: 'uiMode_gamePlay',
  enter: function () {
    //console.log('game playing');
    Game.Message.clear();
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
  getAvatar2: function () {
    return Game.DATASTORE.ENTITY[this.attr._avatar2Id];
  },
  setAvatar: function (a) {
    this.attr._avatarId = a.getId();
  },
  setAvatar2: function (a) {
    this.attr._avatar2Id = a.getId();
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
    display.drawText(1,4,"cur HP: "+this.getAvatar().getCurHp(),fg,bg);

    display.drawText(1,6,"avatar2 x: "+this.getAvatar2().getX(),fg,bg); // DEV
    display.drawText(1,7,"avatar2 y: "+this.getAvatar2().getY(),fg,bg); // DEV
    display.drawText(1,8,"cur2 HP: "+this.getAvatar2().getCurHp(),fg,bg);
  },
  moveAvatar: function (dx,dy) {
    if (this.getAvatar().tryWalk(this.getMap(),dx,dy)) {
      this.setCameraToAvatar();
    }
  },
  moveAvatar2: function (dx,dy) {
    if (this.getAvatar2().tryWalk(this.getMap(),dx,dy)) {
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
    // Game.Message.send("you pressed the '"+String.fromCharCode(inputData.charCode)+"' key");
    Game.renderDisplayMessage();
    if (inputType == 'keypress') {
      if (inputData.key == 'Enter') {
        Game.switchUiMode(Game.UIMode.gameWin);
        return;
      } else if (pressedKey == 's') {
        this.moveAvatar(0,1);
      } else if (pressedKey == 'a') {
        this.moveAvatar(-1,0);
      } else if (pressedKey == 'd') {
        this.moveAvatar(1,0);
      } else if (pressedKey == 'w') {
        this.moveAvatar(0,-1);
      } else if (pressedKey == '[') {
        if (this.getAvatar2().getCurBomb()>=1){
          Game.Message.send("Player2 has dropped a bomb");
          Game.renderDisplayMessage();
          var b = Game.BombGenerator.create('bomb2');
          b.setMap(this.getMap());
          this.getMap().addBomb(b,this.getAvatar2().getPos());
          this.getAvatar2().detonate();
        }
      }else if (pressedKey == ']') {
        Game.Message.send("Player2 has detonated");
        this.getMap().clearWater();
        this.getAvatar2().resetBombs();
        console.dir (this.getMap().attr._bombsByLocation);
        for (var a in this.getMap().attr._bombsByLocation) {
          console.dir(a);
          var b = this.getMap().attr._bombsByLocation[a];
          console.dir (b);
          if (b.hasMixin("Bomb2")){
            b.explode();
          }
        }
      } else if (pressedKey == ' ') {
        if (this.getAvatar().getCurBomb()>=1){
          Game.Message.send("Player1 has dropped a bomb");
          Game.renderDisplayMessage();
          var b = Game.BombGenerator.create('bomb');
          b.setMap(this.getMap());
          this.getMap().addBomb(b,this.getAvatar().getPos());
          this.getAvatar().detonate();
        }
      }else if (pressedKey == 'b') {
        Game.Message.send("Player1 has detonated");
        this.getMap().clearFire();
        this.getAvatar().resetBombs();
        console.dir (this.getMap().attr._bombsByLocation);
        for (var a in this.getMap().attr._bombsByLocation) {
          console.dir(a);
          var b = this.getMap().attr._bombsByLocation[a];
          console.dir (b);
          if (b.hasMixin("Bomb1")){
            b.explode();
          }
        }
      }
    } else if (inputType == 'keydown') {
     if (inputData.keyCode == ROT.VK_LEFT) { // 'Escape'
       this.moveAvatar2(-1,0);
     } else if (inputData.keyCode == ROT.VK_RIGHT) { // '='
       this.moveAvatar2(1,0);
     } else if (inputData.keyCode == ROT.VK_UP) { // '='
       this.moveAvatar2(0,-1);
     } else if (inputData.keyCode == ROT.VK_DOWN) { // '='
       this.moveAvatar2(0,1);
     }
   }
   if (this.getAvatar().getCurHp() <= 0){
     Game.switchUiMode(Game.UIMode.gameWin2);
   }
   if (this.getAvatar2().getCurHp() <= 0){
     Game.switchUiMode(Game.UIMode.gameWin1);
   }
  },
  setupNewGame: function () {
    console.log(Game.UIMode.maps);
    var a = Game.UIMode.maps;
    this.setMap(new Game.Map(a));
    this.setAvatar(Game.EntityGenerator.create('avatar1'));
    this.setAvatar2(Game.EntityGenerator.create('avatar2'));

    this.getMap().addEntity(this.getAvatar(),this.getMap().getRandomWalkableLocation());
    this.getMap().addEntity(this.getAvatar2(),this.getMap().getRandomWalkableLocation());
    this.getMap().updateEntityLocation(this.getAvatar());
    this.getMap().updateEntityLocation(this.getAvatar2());
    // dev code - just add some entities to the map
    for (var ecount = 0; ecount < 40; ecount++) {
      var a = Game.EntityGenerator.create('moss');
      this.getMap().addEntity(a,this.getMap().getRandomWalkableLocation());
      this.getMap().updateEntityLocation(a);
    }
    for (var ecount = 0; ecount < 4; ecount++) {
      var pos = this.getMap().getRandomWalkableLocation();
      this.getMap().setTile(Game.Tile.teleportTile,pos);
      this.getMap().attr._teleportPos[ecount] = pos;
      console.dir(pos);
    }
  }
};

//#############################################################################################################################
//#############################################################################################################################

Game.UIMode.gameWin1 = {
  enter: function () {
    Game.Message.clear();
    Game.Message.send("press [space] to play again")
  },
  exit: function () {
  },
  render: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    display.drawText(1,1,"Avatar 1 has obtained the time machine!!!!");
    display.drawText(5,3,"%c{#000}.%c{}       ___");
    display.drawText(5,4,"_______(_@_)_______");
    display.drawText(5,5,"| POLICE      BOX |");
    display.drawText(5,6,"|_________________|");
    display.drawText(5,7,"%c{#000}.%c{}| _____ | _____ |");
    display.drawText(5,8,"%c{#000}.%c{}| |###| | |###| |");
    display.drawText(5,9,"%c{#000}.%c{}| |###| | |###| |");
    display.drawText(5,10,"%c{#000}.%c{}| _____ | _____ |");
    display.drawText(5,11,"%c{#000}.%c{}| || || | || || |");
    display.drawText(5,12,"%c{#000}.%c{}| ||_|| | ||_|| |");
    display.drawText(5,13,"%c{#000}.%c{}| _____ |$_____ |");
    display.drawText(5,14,"%c{#000}.%c{}| || || | || || |");
    display.drawText(5,15,"%c{#000}.%c{}| ||_|| | ||_|| |");
    display.drawText(5,16,"%c{#000}.%c{}| _____ | _____ |");
    display.drawText(5,17,"%c{#000}.%c{}| || || | || || |");
    display.drawText(5,18,"%c{#000}.%c{}| ||_|| | ||_|| |");
    display.drawText(5,19,"%c{#000}.%c{}|       |       |");
    display.drawText(5,20,"%c{#000}.%c{}*****************");
  },
  handleInput: function (inputType,inputData) {
    if (inputData.keyCode == ROT.VK_SPACE) {
      Game.switchUiMode(Game.UIMode.gameStart);
    }
  }
};

//#############################################################################################################################
//#############################################################################################################################

Game.UIMode.gameWin2 = {
  enter: function () {
    Game.Message.clear();
    Game.Message.send("press [space] to play again")
  },
  exit: function () {
  },
  render: function (display) {
    var fg = Game.UIMode.DEFAULT_COLOR_FG;
    var bg = Game.UIMode.DEFAULT_COLOR_BG;
    display.drawText(1,1,"Avatar 2 has obtained the time machine!!!!");
    display.drawText(5,3,"%c{#000}.%c{}       ___");
    display.drawText(5,4,"_______(_@_)_______");
    display.drawText(5,5,"| POLICE      BOX |");
    display.drawText(5,6,"|_________________|");
    display.drawText(5,7,"%c{#000}.%c{}| _____ | _____ |");
    display.drawText(5,8,"%c{#000}.%c{}| |###| | |###| |");
    display.drawText(5,9,"%c{#000}.%c{}| |###| | |###| |");
    display.drawText(5,10,"%c{#000}.%c{}| _____ | _____ |");
    display.drawText(5,11,"%c{#000}.%c{}| || || | || || |");
    display.drawText(5,12,"%c{#000}.%c{}| ||_|| | ||_|| |");
    display.drawText(5,13,"%c{#000}.%c{}| _____ |$_____ |");
    display.drawText(5,14,"%c{#000}.%c{}| || || | || || |");
    display.drawText(5,15,"%c{#000}.%c{}| ||_|| | ||_|| |");
    display.drawText(5,16,"%c{#000}.%c{}| _____ | _____ |");
    display.drawText(5,17,"%c{#000}.%c{}| || || | || || |");
    display.drawText(5,18,"%c{#000}.%c{}| ||_|| | ||_|| |");
    display.drawText(5,19,"%c{#000}.%c{}|       |       |");
    display.drawText(5,20,"%c{#000}.%c{}*****************");
  },
  handleInput: function (inputType,inputData) {
    if (inputData.keyCode == ROT.VK_SPACE) {
      Game.switchUiMode(Game.UIMode.gameStart);
    }
  }
};
