let Card = require("./card");
let Field = require("./field");

module.exports = class Board {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.fields = [];
    for(let i = 0; i < 4; ++i ){
      this.fields.push(new Field());
    }
  }
};
