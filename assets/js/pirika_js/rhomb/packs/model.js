const SeededRandom = require("./seededRandom");
const EnemyFactory = require("./enemyFactory");
const Sight = require("./sight");
//const Constants = require("./constants");

module.exports = class Model {
  constructor() {
    this.boot();
  }

  boot(){
    this.seededRandom = new SeededRandom(-1);
    this.enemies = [];
    this.sight = new Sight();
  }

  initialize(seed){
    this.seededRandom = new SeededRandom(seed);
    this.initializeEnemies();
    this.sight.updatePosition(0, 0);
  }

  initializeEnemies(){
    const factory = new EnemyFactory(this.seededRandom);
    this.enemies = factory.createEnemies();
  }
};
