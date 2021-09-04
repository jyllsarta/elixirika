let Card = require("./card");
let Field = require("./field");
const Constants = require("./constants");

module.exports = class Board {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.fields = [];
    for(let i = 0; i < Constants.fieldCardNumber; ++i ){
      this.fields.push(new Field());
    }
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
