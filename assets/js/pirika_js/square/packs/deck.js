let Card = require("./card");

module.exports = class Deck {
  constructor() {
    this.initiate();
  }
  
  initiate(){
    this.truncate();
    this.setDefault();
    this.shuffle();
  }

  // private

  truncate(){
    this.cards = [];
  }

  setDefault(){
    for(let i = 1; i <= 10; ++i){
      for(let suit of ["s", "d", "c", "h"]){
        this.cards.push(new Card(i, suit, "normal"));
      }
    }
    for(let i = 11; i <= 13; ++i){
      for(let suit of ["s", "d", "c", "h"]){
        this.cards.push(new Card(i, suit, "sender"));
      }
    }
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
};
