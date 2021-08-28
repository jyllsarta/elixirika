let Card = require("./card");
let Field = require("./field");

module.exports = class StarPalette {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.fields = [];
  }

  status(){
    let status = [];
    this.fields.map(field=>status[Math.min(field.cards.length, 8)]=true);
    return status;
  }

  score(){
    return this.fields.reduce((x,y)=>x+y.score(), 0)
  }
};
