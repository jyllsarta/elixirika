module.exports = class Card {
  constructor(number, suit, category) {
    this.number = number;
    this.suit = suit;
    this.category = category;
    this.id = Math.floor(Math.random() * 1000000000);
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
};
