const Constants = require("./constants");

module.exports = class Card {
  constructor(number, suit, category) {
    this.number = number;
    this.suit = suit;
    this.category = category;
    this.id = Math.floor(Math.random() * Constants.maxRandomSeed);
    this.selected = false;
  }

  stringExpression(){
    return `${this.number}${this.suit}`; 
  }

  color(){
    if(this.suit == "s" || this.suit == "c"){
      return "b"
    }
    if(this.suit == "h" || this.suit == "d"){
      return "w"
    }
    return "?"
  }

  isSenderCard(){
    return this.category === "sender";
  }

  isSpecialCard(){
    return this.category === "special";
  }

  setSelected(state){
    this.selected = state;
  }

  isSelected(){
    return this.selected;
  }
};
