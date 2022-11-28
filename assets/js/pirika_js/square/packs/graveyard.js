let Card = require("./card");
let Field = require("./field");

module.exports = class Graveyard {
  constructor() {
    this.initiate();
  }

  initiate() {
    this.field = new Field();
  }
};
