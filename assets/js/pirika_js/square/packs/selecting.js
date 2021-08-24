let Card = require("./card");
let Field = require("./field");

module.exports = class Selecting {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.field = new Field();
  }
};
