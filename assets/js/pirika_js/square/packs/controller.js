let Model = require("./model");

module.exports = class Controller {
  constructor() {
    this.model = null;
    window.contoller = this;
  }

  setModel(model){
    this.model = model;
  }

  // 手札の引き直し
  // 手札を全て墓地に送る・デッキから引けるだけ引く
  fillDraw(){
    this.model.hand.field.sendAllCardTo(this.model.graveyard.field)
    for(let i=0; i<4; ++i){
      this.model.hand.field.addCard(this.model.deck.field.draw());
    }
  }

  sendHandToBoard(handIndex, boardIndex){
    const card = this.model.hand.field.cards[handIndex];
    this.model.hand.field.sendCardById(card.id, this.model.board.fields[boardIndex]);
  }
};
