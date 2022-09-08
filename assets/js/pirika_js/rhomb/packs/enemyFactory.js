const Enemy = require("./enemy");

module.exports = class EnemyFactory {
  constructor(seededRandom) {
    this.initialize(seededRandom);
    this.enemyIdCounter = 1000;
  }

  initialize(seededRandom){
    this.seededRandom = seededRandom;
    return this.createEnemies();
  }

  createEnemies(){
    let enemies = [];
    for(let i = 0; i < 5; ++i){
      enemies.push(new Enemy(this.seededRandom, this.enemyIdCounter++));
    }
    return enemies;
  }
};
