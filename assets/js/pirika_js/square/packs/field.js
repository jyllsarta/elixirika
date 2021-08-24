// カードが積まれる場所
// Ex. 手札 星座盤の1~8+それぞれ ボードの4箇所 デッキ 墓地 選択中カード
module.exports = class Field {
  constructor() {
    this.truncate();
  }

  addCard(card){
    this.cards.push(card);
  }

  truncate(){
    this.cards = [];
  }

  shuffle(){
    let list = this.cards;
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      if (i == j) continue;
      var k = list[i];
      list[i] = list[j];
      list[j] = k;
    }
    this.cards = list;
  }

  sendAllCardTo(toField){
    toField.cards = toField.cards.concat(this.cards);
    this.cards = [];
  }

  draw(){
    if(this.cards.length == 0){
      console.warn("trying to draw from empty field");
    }
    return this.cards.shift(0);
  }
};
