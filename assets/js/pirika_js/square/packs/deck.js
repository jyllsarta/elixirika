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
    this.field.shuffle();
  }

  // private

  setDefault(){
    for(let i = 1; i <= 10; ++i){
      for(let suit of ["s", "d", "c", "h"]){
        this.field.addCard(new Card(i, suit, "normal"));
      }
    }
    for(let i = 11; i <= 13; ++i){
      for(let suit of ["s", "d", "c", "h"]){
        this.field.addCard(new Card(i, suit, "sender"));
      }
    }
  }
};