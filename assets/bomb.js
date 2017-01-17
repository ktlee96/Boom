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
  console.log("explode");
  console.dir(this.getMap().attr._locationsByBomb);
 var pos = this.getMap().attr._locationsByBomb[this];
 console.dir(pos);
 var posX = parseInt(pos);
 var posY = pos.substring(3,5);
 console.log(posX + 1);
 console.dir(this.getMap().getEntity(posX+1 + ","+ posY));
 this.getMap().extractEntityAt(posX+1 + ","+ posY);
 this.getMap().extractEntityAt(posX + ","+ posY+1);
 this.getMap().extractEntityAt(posX-1 + ","+ posY);
 this.getMap().extractEntityAt(posX + ","+ posY-1);

};
