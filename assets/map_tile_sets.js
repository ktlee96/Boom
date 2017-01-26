Game.MapTileSets = {
  caves1: {
    _width: 80,
    _height: 24,
    _teleport:4,
    getMapTiles: function () {
      var mapTiles = Game.util.init2DArray(this._width,this._height,Game.Tile.nullTile);
      var generator = new ROT.Map.Rogue(this._width,this._height);
      //generator.randomize(0.5);

      // repeated cellular automata process
      var totalIterations = 3;
      for (var i = 0; i < totalIterations - 1; i++) {
        generator.create();
      }

      // run again then update map
      generator.create(function(x,y,v) {
        var a = ROT.RNG.getUniform();
        if (v === 1) {
          //var a = ROT.RNG.getUniform();
          if (a < 0.2 ){
            mapTiles[x][y]= Game.Tile.decTile;
          }
          else if (a <0.3){
            mapTiles[x][y] = Game.Tile.everTile;
          }
          else {
          mapTiles[x][y] = Game.Tile.treeTile;}
        }
          //var a = ROT.RNG.getUniform();
          else{
          mapTiles[x][y] = Game.Tile.floorTile;

        }});
      return mapTiles;
    }
  },

  caves2: {
    _width: 80,
    _height: 24,
    _teleport:4,
    getMapTiles: function () {
      var mapTiles = Game.util.init2DArray(this._width,this._height,Game.Tile.nullTile);
      var generator = new ROT.Map.Rogue(this._width,this._height);
      //generator.randomize(0.5);

      // repeated cellular automata process
      var totalIterations = 3;
      for (var i = 0; i < totalIterations - 1; i++) {
        generator.create();
      }

      // run again then update map
      generator.create(function(x,y,v) {
        var a = ROT.RNG.getUniform();
        if (v === 1) {
          //var a = ROT.RNG.getUniform();
          if (a <0.3){
            mapTiles[x][y] = Game.Tile.snowTile;
          }
          else {
          mapTiles[x][y] = Game.Tile.mountTile;}
        }
          //var a = ROT.RNG.getUniform();
          else{
          mapTiles[x][y] = Game.Tile.floorTile;

        }});
      return mapTiles;
    }
  },
  caves3: {
    _width: 80,
    _height: 24,
    _teleport:4,
    getMapTiles: function () {
      var mapTiles = Game.util.init2DArray(this._width,this._height,Game.Tile.nullTile);
      var generator = new ROT.Map.Rogue(this._width,this._height);
      //generator.randomize(0.5);

      // repeated cellular automata process
      var totalIterations = 3;
      for (var i = 0; i < totalIterations - 1; i++) {
        generator.create();
      }

      // run again then update map
      generator.create(function(x,y,v) {
        var a = ROT.RNG.getUniform();
        if (v === 1) {
          //var a = ROT.RNG.getUniform();
          if (a <0.3){
            mapTiles[x][y] = Game.Tile.hotelTile;
          }
          else if (a <0.7){
            mapTiles[x][y] = Game.Tile.bankTile;
          }
          else {
          mapTiles[x][y] = Game.Tile.postTile;}
        }
          //var a = ROT.RNG.getUniform();
          else{
          mapTiles[x][y] = Game.Tile.floorTile;

        }});
      return mapTiles;
    }
  },
  caves4: {
    _width: 80,
    _height: 24,
    _teleport:4,
    getMapTiles: function () {
      var mapTiles = Game.util.init2DArray(this._width,this._height,Game.Tile.nullTile);

      for (var x =0; x < this._width; x++){
        for (var y=0; y< this._height; y++){
          if (x <= 1 || x >= 78 || y <= 1 || y >= 22){
            mapTiles[x][y]= Game.Tile.bangTile;
          } else {
            mapTiles[x][y] = Game.Tile.floorTile;
          }
        }
      }
      return mapTiles;
    }
  },
  caves5: {
    _width: 80,
    _height: 24,
    _teleport:4,
    getMapTiles: function () {
      var mapTiles = Game.util.init2DArray(this._width,this._height,Game.Tile.nullTile);
      var generator = new ROT.Map.Cellular(30,this._height);
      generator.randomize(0.5);
      var totalIterations = 3;
      for (var i = 0; i < totalIterations - 1; i++) {
        generator.create();
      }

      // run again then update map
      generator.create(function(x,y,v) {
        if (v === 1) {
          mapTiles[x][y] = Game.Tile.floorTile;
        } else {
          mapTiles[x][y] = Game.Tile.pinTile;
        }
      });
      for (var a = 30; a < this._width; a++){
        for (var b = 0; b < this._height; b++){
          mapTiles[a][b] = Game.Tile.pinTile;
        }
      }
      mapTiles[70][10] = Game.Tile.timeTile;
      return mapTiles;
    }
  }
};
