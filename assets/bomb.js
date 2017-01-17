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
