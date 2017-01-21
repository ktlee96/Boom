Game.ItemGenerator = new Game.Generator('items',Game.Item);

Game.ItemGenerator.learn({
  name: 'health',
  chr:'💊',
  fg:'#aaa',
  mixins: ["Health"]
});
Game.ItemGenerator.learn({
  name: 'damage',
  chr:'🔋',
  fg:'#aaa'
});
Game.ItemGenerator.learn({
  name: 'extra',
  chr:'🔵',
  fg:'#aaa'
});
