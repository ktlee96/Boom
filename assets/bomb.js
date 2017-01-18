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

this.destroy(1,0);
this.destroy(0,1);
this.destroy(-1,0);
this.destroy(0,-1);

 delete Game.DATASTORE.BOMB[this.getId()];
 delete this.getMap().attr._bombsByLocation[this.getMap().attr._locationsByBomb[this.getId()]];
 delete this.getMap().attr._locationsByBomb[this.getId()];
 Game.renderDisplayAll();
};

Game.Bomb.prototype.destroy = function (dx, dy) {
  var pos = this.getMap().attr._locationsByBomb[this.getId()];
  console.log(pos);
  var posArr = pos.split(',');
  var posX = posArr[0];
  var posY = posArr[1];
  var useX = (posX*1) + dx;
  var useY = (posY*1) + dy;
  delete Game.DATASTORE.ENTITY[this.getMap().attr._entitiesByLocation[useX + ","+ useY]];
  delete this.getMap().attr._entitiesByLocation[useX+","+useY];
  delete this.getMap().attr._locationsByEntity[this.getMap().attr._entitiesByLocation[useX + ","+ useY]];
  //Game.Tile.fireTile.draw();
};
