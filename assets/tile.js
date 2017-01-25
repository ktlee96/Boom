Game.Tile = function (properties) {
  properties = properties || {};
  Game.Symbol.call(this, properties);
  if (! ('attr' in this)) { this.attr = {}; }
  this.attr._name = properties.name || 'unknown';
  this.attr._walkable = properties.walkable||false;
  this.attr._diggable = properties.diggable||false;
};
Game.Tile.extend(Game.Symbol);

Game.Tile.prototype.getName = function () {
  return this.attr._name;
};
Game.Tile.prototype.isWalkable = function () {
  return this.attr._walkable;
};
Game.Tile.prototype.isDiggable = function () {
  return this.attr._diggable;
};

//-----------------------------------------------------------------------------

Game.Tile.nullTile = new Game.Tile({name:'nullTile'});
Game.Tile.floorTile = new Game.Tile({name:'floor',chr:' ',walkable:true});
Game.Tile.fireTile = new Game.Tile({name:'fire',chr:'🔥',walkable:true});
Game.Tile.waterTile = new Game.Tile({name:'water',chr:'💧',walkable:true});
Game.Tile.teleportTile = new Game.Tile({name:'tele',chr:'🚪',walkable:true});

Game.Tile.wallTile = new Game.Tile({name:'wall',chr:'💜'});

Game.Tile.decTile = new Game.Tile({name:'dec',chr:'🌳'});
Game.Tile.everTile = new Game.Tile({name:'ever',chr:'🌲'});
Game.Tile.treeTile = new Game.Tile({name:'tree',chr:'🌴'});

Game.Tile.mountTile = new Game.Tile({name:'mount',chr:'☃️'});
Game.Tile.snowTile = new Game.Tile({name:'snow',chr:'❄️️️'});

Game.Tile.hotelTile = new Game.Tile({name:'hotel',chr:'🏨'});
Game.Tile.bankTile = new Game.Tile({name:'bank',chr:'🕍'});
Game.Tile.postTile = new Game.Tile({name:'post',chr:'🏛️'});
