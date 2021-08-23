let Card = require("./card");

module.exports = class Deck {
  constructor() {
    this.cards = [ new Card(1, "h"), new Card(5, "s"), new Card(2, "d") ];
  }
};
