const Constants = require("./constants");
const GlobalIdFactory = require("./globalIdFactory");

module.exports = class Card {
  constructor(number, suit, category) {
    this.number = number;
    this.suit = suit;
    this.category = category;
    this.id = GlobalIdFactory.next();
    this.selected = false;
  }

  stringExpression(){
    switch(this.category){
      case "sender":
        return `^`; 
      case "special":
        return `◇`; 
      case "normal":
        return `${this.number}`; 
      default:
        return `!`;
    }
  }

  viewClass(){
    let classes = [];
    if(this.isSelected()){
      classes.push("selected");
    }

    if(this.suit === "h"){
      classes.push("h");
    }
    else if(this.suit === "s"){
      classes.push("s");
    }
    else if(this.suit === "j"){
      classes.push("j");
    }
    else {
      classes.push("special");
    }

    return classes.join(" ");
  }

  color(){
    if(this.suit == "s" || this.suit == "c"){
      return "b"
    }
    if(this.suit == "h" || this.suit == "d"){
      return "w"
    }
    if(this.suit == "j"){
      return "j"
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
