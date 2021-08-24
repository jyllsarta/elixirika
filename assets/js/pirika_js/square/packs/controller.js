const Field = require("./field");
let Model = require("./model");

module.exports = class Controller {
  constructor() {
    this.model = null;
    window.contoller = this;
  }

  startGame(){
    this.model = new Model();
    return this.model;
  }

  // 手札の引き直し
  // 手札を全て墓地に送る・デッキから引けるだけ引く
  fillDraw(){
    this.model.hand.field.sendAllCardTo(this.model.graveyard.field)
    for(let i=0; i<4; ++i){
      this.model.hand.field.addCard(this.model.deck.field.draw());
    }
  }

  // 手札からボードへの提出 基本アクション
  sendHandToBoard(handIndex, boardIndex){
    const card = this.model.hand.field.cards[handIndex];
    if(!this.model.board.isStackable(card, boardIndex)){
      console.error("cannot stack this card!");
      return;
    }
    this.model.hand.field.sendCardById(card.id, this.model.board.fields[boardIndex]);
  }

  // ∞カード(ようは絵札) が積まれているボードを指定し、星座盤へ送る
  commitSenderCard(fieldIndex){
    if(!this.model.board.isSendable(fieldIndex)){
      console.error("cannot send");
      return;
    }
    let newField = new Field();
    this.model.board.fields[fieldIndex].sendAllCardTo(newField);
    this.model.starPalette.fields.push(newField);
  }
  
};
