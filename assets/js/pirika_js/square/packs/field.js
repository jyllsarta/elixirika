let Constants = require("./constants");
const GlobalIdFactory = require("./globalIdFactory");


// カードが積まれる場所
// Ex. 手札 星座盤の1~8+それぞれ ボードの4箇所 デッキ 墓地 選択中カード
// 「カードを送っていいかどうか」はここでは扱わない。そのバリデーションは一個上の層で行う。こっちは実エンティティ操作の低レベルAPIみたいな想定
module.exports = class Field {
  constructor(index=null) {
    this.truncate();
    this.id = GlobalIdFactory.next();
    this.index = index;
  }

  addCard(card, options){
    if(options?.index !== undefined){
      this.cards.splice(options.index, 0, card);
    }
    else{
      this.cards.push(card);
    }
  }

  truncate(){
    this.cards = [];
  }

  shuffle(seededRandom){
    let list = this.cards;
    for (var i = list.length - 1; i > 0; i--) {
      var j = seededRandom.randInt(0, i);
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

  sendCardById(cardId, toField, options){
    let sendCard = this.cards.find(card=>card.id==cardId);
    if(!sendCard || !toField){
      console.error(`sendCard ${cardId} or toField ${toField} is not valid`);
      return;
    }
    this.cards = this.cards.filter(card=>card!=sendCard)
    toField.addCard(sendCard, options);
  }

  getLastCard(){
    return this.cards.slice(-1)[0];
  }

  lengthBonus(){
    return this.cards.length >= Constants.cardCountScoreBonusThreshold  ? 2 : 1;
  }

  score(){
    return Math.min(Math.floor(this.lengthBonus() * this.cards.reduce((x,y)=>x+y.number, 0)), Constants.maxScorePerField);
  }
};
