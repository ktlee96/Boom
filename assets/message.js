Game.Message = {
  _curMessage: '',
  render: function (display) {
    display.clear();
    display.drawText(1,1,this._curMessage,'#fff','#000');
  },
  send: function (msg) {
    this._curMessage = msg + "\n" + this._curMessage;
  },
  clear: function () {
    this._curMessage = '';
  }
};
