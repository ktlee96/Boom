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
  name: 'moss',
  chr:'📦',
  fg:'#6b6',
  maxHp: 1,
  mixins: ["HitPoints"]
});
