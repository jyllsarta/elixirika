let Card = require("./card");
let Field = require("./field");

module.exports = class Deck {
  constructor() {
    this.initiate();
  }
  
  initiate(){
    this.field = new Field();
    this.field.truncate();
    this.setDefault();
  }
  
  shuffle(seed){
    this.field.shuffle(seed);
  }

  // private

  setDefault(){
    for(let i = 1; i <= 10; ++i){
      for(let suit of ["s", "s", "h", "h"]){
        this.field.addCard(new Card(i, suit, "normal"));
      }
    }
    for(let i = 11; i <= 13; ++i){
      for(let suit of ["s", "s", "h", "h"]){
        this.field.addCard(new Card(i, suit, "sender"));
      }
    }
    this.field.addCard(new Card( 0, "X", "special"));
    this.field.addCard(new Card( 0, "X", "special"));
  }
};
