Game.MapTileSets = {
  caves1: {
    _width: 78,
    _height: 20,
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
          mapTiles[x][y] = Game.Tile.wallTile;}
        } 
          //var a = ROT.RNG.getUniform();
          else{
          mapTiles[x][y] = Game.Tile.floorTile;

        }});
      return mapTiles;
    }
  },

  caves2: {

  }
};
