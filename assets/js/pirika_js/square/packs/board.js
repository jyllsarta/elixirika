let Card = require("./card");
let Field = require("./field");

module.exports = class Board {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.fields = [];
    for(let i = 0; i < 4; ++i ){
      this.fields.push(new Field());
    }
  }

  isStackable(card, fieldIndex){
    const field = this.fields[fieldIndex];
    if(!field){
      return false;
    }
    if(field.cards.length === 0){
      return true;
    }
    const lastCard = field.getLastCard();
    if(lastCard.color() == card.color()){
      return false;
    }
    if(lastCard.number > card.number){
      return false;
    }
    return true;
  }

  // ボードからのsend == 星座盤への投入
  isSendable(fieldIndex){
    const lastCard = this.fields[fieldIndex]?.getLastCard();
    if(!lastCard){
      return false;
    }
    return lastCard.isSenderCard();
  }
};