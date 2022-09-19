const SeededRandom = require("./seededRandom");
//const Constants = require("./constants");

module.exports = class Model {
  constructor() {
    this.boot();
  }

  boot(){
    this.seededRandom = new SeededRandom(-1);
    this.isGameStarted = false;
    this.isGameOver = false;
  }

  initialize(seed){
    this.seededRandom = new SeededRandom(seed);
    this.initializeEnemies();
    this.isGameStarted = false;
  }

  startGame(){
    this.isGameStarted = true;
  }

  // private
};
