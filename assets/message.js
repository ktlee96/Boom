Game.Message = {
  _curMessage: '',
  render: function (display) {
    display.clear();
    var a = this._curMessage.split("\n");
    display.drawText(1,1,'%c{#fdd}%b{#000}'+a[0]+'%c{}%b{}');
    display.drawText(1,2,'%c{#aaa}%b{#000}'+a.slice(1).join("\n")+'%c{}%b{}');


    // display.drawText(1,1,this._curMessage,'#fff','#000');
  },
  send: function (msg) {
    this._curMessage = (msg + "\n" + this._curMessage).substr(0,2000);
  },
  clear: function () {
    this._curMessage = '';
  }
};
