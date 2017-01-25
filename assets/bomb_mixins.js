Game.BombMixin = {};

Game.BombMixin.Bomb1 = {
  META: {
    mixinName: 'Bomb1',
  stateNamespace: '_Bomb1_attr',
  stateModel: {
    specialBomb: false,
    specialLeft: 0
  }
},
isSpecial: function  () {
  return this.attr._Bomb1_attr.specialBomb&&(this.attr._Bomb1_attr.specialLeft>0);
},
setSpecial: function () {
  this.attr._Bomb1_attr.specialBomb = true;
  this.attr._Bomb1_attr.specialLeft = 10;
}

};
Game.BombMixin.Bomb2 = {
  META: {
    mixinName: 'Bomb2',
    stateNamespace: '_Bomb2_attr',
    stateModel: {
      specialBomb: false,
      specialLeft: 0
    }
  },
isSpecial: function  () {
  return this.attr._Bomb2_attr.specialBomb&&(this.attr._Bomb2_attr.specialLeft>0);
},
setSpecial: function () {
  this.attr._Bomb2_attr.specialBomb = true;
  this.attr._Bomb2_attr.specialLeft = 10;
}
};
