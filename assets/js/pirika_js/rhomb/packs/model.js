const SeededRandom = require("./seededRandom");
const EnemyFactory = require("./enemyFactory");
//const Constants = require("./constants");

module.exports = class Model {
  constructor() {
    this.boot();
  }

  boot(){
    this.seededRandom = new SeededRandom(-1);
    this.enemies = [];
  }

  initialize(seed){
    this.seededRandom = new SeededRandom(seed);
    this.initializeEnemies();
  }

  initializeEnemies(){
    const factory = new EnemyFactory(this.seededRandom);
    this.enemies = factory.createEnemies();
  }
};
