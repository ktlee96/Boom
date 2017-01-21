Game.BombGenerator = new Game.Generator('bombs',Game.Bomb);

Game.BombGenerator.learn({
  name: 'bomb',
  chr:'💣',
  fg:'#bbc',
  mixins: ["Bomb1"]
});

Game.BombGenerator.learn({
  name: 'bomb2',
  chr:'💩',
  fg:'#bbc',
  mixins: ["Bomb2"]
});
