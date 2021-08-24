let Card = require("./card");
let Field = require("./field");

module.exports = class StarPalette {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.fields = [];
  }
};
