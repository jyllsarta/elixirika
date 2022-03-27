let Card = require("./card");
let Field = require("./field");
const Constants = require("./constants");

module.exports = class Deck {
  constructor() {
    this.initiate();
  }
  
  initiate(){
    this.field = new Field();
    this.field.truncate();
    this.setDefault();
  }
  
  shuffle(seededRandom){
    this.field.shuffle(seededRandom);
  }

  // private

  setDefault(){
    for(let i = 1; i <= Constants.normalCardPerSuit; ++i){
      for(let suit of ["s", "s", "h", "h"]){
        this.field.addCard(new Card(i, suit, "normal"));
      }
    }
    for(let i = 1; i <= Constants.senderCardPerSuit; ++i){
      for(let suit of ["s", "h"]){
        this.field.addCard(new Card(Constants.senderCardRank, suit, "sender"));
      }
    }
  }
};
