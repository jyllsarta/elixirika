let Card = require("./card");
let Field = require("./field");

module.exports = class Hand {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.field = new Field();
  }

  disselectAllCard(){
    this.field.cards.map(card=>card.setSelected(false));
  }
};
