Game.EntityGenerator = new Game.Generator('entities',Game.Entity);

Game.EntityGenerator.learn({
  name: 'avatar2',
  chr:'🐙',
  fg:'#dda',
  maxHp: 10,
  mixins: ["WalkerCorporeal","HitPoints","Chronicle","Bomberman"]
});

Game.EntityGenerator.learn({
  name: 'avatar1',
  chr:'👺',
  fg:'#dda',
  maxHp: 10,
  mixins: ["WalkerCorporeal","HitPoints","Chronicle","Bomberman"]
});

Game.EntityGenerator.learn({
  name: 'box',
  chr:'📦',
  fg:'#6b6',
  maxHp: 1,
  mixins: ["HitPoints"]
});

Game.EntityGenerator.learn({
  name: 'rock',
  chr:'💎',
  fg:'#6b6',
  maxHp: 1,
  mixins: ["HitPoints"]
});
Game.EntityGenerator.learn({
  name: 'mushroom',
  chr:'🍄',
  fg:'#6b6',
  maxHp: 1,
  mixins: ["HitPoints"]
});
Game.EntityGenerator.learn({
  name: 'present',
  chr:'🎁',
  fg:'#6b6',
  maxHp: 1,
  mixins: ["HitPoints"]
});
