Game.EntityMixin = {};

// Mixins have a META property is is info about/for the mixin itself and then all other properties. The META property is NOT copied into objects for which this mixin is used - all other properies ARE copied in.

Game.EntityMixin.WalkerCorporeal = {
  META: {
    mixinName: 'WalkerCorporeal',
    mixinGroup: 'Walker'
  },
  tryWalk: function (map,dx,dy) {
    var targetX = Math.min(Math.max(0,this.getX() + dx),map.getWidth());
    var targetY = Math.min(Math.max(0,this.getY() + dy),map.getHeight());
    if (map.getEntity(targetX,targetY)) { // can't walk into spaces occupied by other entities
      // NOTE: attack / interact handling (or event raising) would go here
      return false;
    }
    //console.log(targetX + ", " + targetY);
    if (map.getBombs(targetX,targetY)) { // can't walk into spaces occupied by other entities
      // NOTE: attack / interact handling (or event raising) would go here
      return false;
    }
    if (map.getTile(targetX,targetY)==Game.Tile.fireTile) {
      if (this.hasMixin('HitPoints')) {
        this.takeHits(2);
      }
    }
    if (map.getItems(targetX,targetY)) {
      if (map.getItems(targetX,targetY).hasMixin("Health")){
      if (this.hasMixin('HitPoints')) {
        delete Game.DATASTORE.ITEM[map.attr._entitiesByLocation[targetX + ","+ targetY]];
        delete map.attr._itemsByLocation[targetX+","+targetY];
        this.takeHits(-2);
        }
      }
    }
    if (map.getTile(targetX,targetY).isWalkable()) {
      this.setPos(targetX,targetY);
      var myMap = this.getMap();
      if (myMap) {
        myMap.updateEntityLocation(this);
      }
      if (this.hasMixin('Chronicle')) { // NOTE: this is sub-optimal because it couples this mixin to the Chronicle one (i.e. this needs to know the Chronicle function to call) - the event system will solve this issue
        this.trackTurn();
      }
      return true;
    }
    return false;
  }
};

Game.EntityMixin.Chronicle = {
  META: {
    mixinName: 'Chronicle',
    mixinGroup: 'Chronicle',
    stateNamespace: '_Chronicle_attr',
    stateModel:  {
      turnCounter: 0
    }
  },
  trackTurn: function () {
    this.attr._Chronicle_attr.turnCounter++;
  },
  getTurns: function () {
    return this.attr._Chronicle_attr.turnCounter;
  },
  setTurns: function (n) {
    this.attr._Chronicle_attr.turnCounter = n;
  }
};
Game.EntityMixin.Detonation = {
  META: {
    mixinName: 'Detonation',
    mixinGroup:'Detonation',


  }
}
Game.EntityMixin.HitPoints = {
  META: {
    mixinName: 'HitPoints',
    mixinGroup: 'HitPoints',
    stateNamespace: '_HitPoints_attr',
    stateModel:  {
      maxHp: 10,
      curHp: 10
    },
    init: function (template) {
      this.attr._HitPoints_attr.maxHp = template.maxHp || 1;
      this.attr._HitPoints_attr.curHp = template.curHp || this.attr._HitPoints_attr.maxHp;
    }
  },
  getMaxHp: function () {
    return this.attr._HitPoints_attr.maxHp;
  },
  setMaxHp: function (n) {
    this.attr._HitPoints_attr.maxHp = n;
  },
  getCurHp: function () {
    return this.attr._HitPoints_attr.curHp;
  },
  setCurHp: function (n) {
    this.attr._HitPoints_attr.curHp = n;
  },
  takeHits: function (amt) {
    this.attr._HitPoints_attr.curHp -= amt;
  },
  recoverHits: function (amt) {
    this.attr._HitPoints_attr.curHp = Math.min(this.attr._HitPoints_attr.curHp+amt,this.attr._HitPoints_attr.maxHp);
  }
};
