let Deck = require("./deck");

module.exports = class Model {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.deck = new Deck();
  }
};
