module.exports = class Card {
  constructor(number, suit, category) {
    this.number = number;
    this.suit = suit;
    this.category = category;
    this.id = Math.floor(Math.random() * 1000000000);
  }
};
