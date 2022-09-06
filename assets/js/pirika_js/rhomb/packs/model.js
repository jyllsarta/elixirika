let SeededRandom = require("./seededRandom");
//const Constants = require("./constants");

module.exports = class Model {
  constructor(seed) {
    this.initiate(seed);
  }

  initiate(seed){
    this.seededRandom = new SeededRandom(seed);
    this.seed = seed;
    this.onGameStart();
  }

  onGameStart(){
  }
};
