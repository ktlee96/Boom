Game.DATASTORE.BOMB = {};

Game.Bomb = function(template) {
    template = template || {};
    // console.log("creating entity using template");
    // Game.util.cdebug(template);

    this._mixinSet = Game.BombMixin;
    Game.SymbolActive.call(this, template);
    this.attr._generator_template_key = template.generator_template_key || '';
    this.attr._walkable = template.walkable||false;
    console.dir(this.attr._generator_template_key);
    Game.DATASTORE.BOMB[this.attr._id] = this;
};
Game.Bomb.extend(Game.SymbolActive);

Game.Bomb.prototype.getId = function() {
    return this.attr._id;
};

Game.Bomb.prototype.getMap = function() {
    return Game.DATASTORE.MAP[this.attr._mapId];
};
Game.Bomb.prototype.setMap = function(map) {
    this.attr._mapId = map.getId();
};

Game.Bomb.prototype.explode = function () {
  if (this.hasMixin("Bomb1")){
    for (var a = 1; a <= Game.UIMode.gamePlay.getAvatar().getBombRange();a ++ ){
    this.destroy(a,0);
    this.destroy(0,a);
    this.destroy(-a,0);
    this.destroy(0,-a);}
    if (Game.UIMode.gamePlay.getAvatar().isSpecial()) {
      for (var a = 1; a <= Game.UIMode.gamePlay.getAvatar().getBombRange();a ++ ){
      this.destroy(a,a);
      this.destroy(-a,a);
      this.destroy(-a,-a);
      this.destroy(a,-a);}
    }

  }
  else if (this.hasMixin("Bomb2")){
    for (var a = 1; a <= Game.UIMode.gamePlay.getAvatar2().getBombRange();a ++ ){
    this.destroy(a,0);
    this.destroy(0,a);
    this.destroy(-a,0);
    this.destroy(0,-a);
  }
  if (Game.UIMode.gamePlay.getAvatar2().isSpecial()) {
    console.log("special")
    for (var a = 1; a <= Game.UIMode.gamePlay.getAvatar2().getBombRange();a ++ ){
      this.destroy(a,a);
      this.destroy(-a,a);
      this.destroy(-a,-a);
      this.destroy(a,-a);}
    }
  }

  this.destroy(0,0);


 delete Game.DATASTORE.BOMB[this.getId()];
 delete this.getMap().attr._bombsByLocation[this.getMap().attr._locationsByBomb[this.getId()]];
 delete this.getMap().attr._locationsByBomb[this.getId()];
 Game.renderDisplayAll();

};

Game.Bomb.prototype.destroy = function (dx, dy) {
  var pos = this.getMap().attr._locationsByBomb[this.getId()];
  //console.log(pos);
  var posArr = pos.split(',');
  var posX = posArr[0];
  var posY = posArr[1];
  var useX = (posX*1) + dx;
  var useY = (posY*1) + dy;
  if (this.getMap().attr._entitiesByLocation[useX + ","+ useY]) {
    console.log ("entities at: " +useX + "," + useY);
    var a = Game.DATASTORE.ENTITY[this.getMap().attr._entitiesByLocation[useX + "," + useY]];
    if(a.getName()=="avatar1"){
      Game.Message.send("Player1 has been hit by a bomb");
      Game.renderDisplayMessage();
      a.takeHits(8);
    } else if(a.getName()=="avatar2"){
      Game.Message.send("Player2 has been hit by a bomb");
      Game.renderDisplayMessage();
      a.takeHits(8);
    }
    else{
     var a = ROT.RNG.getUniform();
       if (a < 0.2 ){
         var b = Game.ItemGenerator.create('health');
         this.getMap().addItem(b,useX + "," + useY);
         b.setMap(this.getMap());
       }
       else if(a < 0.3) {
         var b = Game.ItemGenerator.create('damage');
         this.getMap().addItem(b,useX + "," + useY);
         b.setMap(this.getMap());
       }
       else if(a < 0.4) {
         var b = Game.ItemGenerator.create('extra');
         this.getMap().addItem(b,useX + "," + useY);
         b.setMap(this.getMap());
       }
       else if(a < 0.5) {
         var b = Game.ItemGenerator.create('special');
         this.getMap().addItem(b,useX + "," + useY);
         b.setMap(this.getMap());
       }
       delete Game.DATASTORE.ENTITY[this.getMap().attr._entitiesByLocation[useX + ","+ useY]];
       delete this.getMap().attr._entitiesByLocation[useX+","+useY];
       delete this.getMap().attr._locationsByEntity[this.getMap().attr._entitiesByLocation[useX + ","+ useY]];
     }
   }


  if ((this.getMap().getTile(useX,useY) != Game.Tile.decTile&&this.getMap().getTile(useX,useY) != Game.Tile.treeTile&&this.getMap().getTile(useX,useY) != Game.Tile.everTile)){
    if (this.getMap().getTile(useX,useY) != Game.Tile.mountTile&&this.getMap().getTile(useX,useY) != Game.Tile.snowTile){
      if (this.getMap().getTile(useX,useY) != Game.Tile.hotelTile&&this.getMap().getTile(useX,useY) != Game.Tile.postTile&&this.getMap().getTile(useX,useY) != Game.Tile.bankTile){
        if (this.getMap().getTile(useX,useY) != Game.Tile.teleportTile){
          if (this.getMap().getTile(useX,useY) != Game.Tile.bangTile){
            if (this.getMap().getTile(useX,useY) != Game.Tile.pinTile){
              if (this.hasMixin("Bomb1")){
                this.getMap()._tiles[useX][useY] = Game.Tile.fireTile;}
              else if (this.hasMixin("Bomb2")){
              this.getMap()._tiles[useX][useY] = Game.Tile.waterTile;}
            }
          }
        }
      }
    }
  }
};
