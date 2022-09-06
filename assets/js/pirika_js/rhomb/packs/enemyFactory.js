const Enemy = require("./enemy");

module.exports = class EnemyFactory {
  constructor(seededRandom) {
    this.initialize(seededRandom);
  }

  initialize(seededRandom){
    this.seededRandom = seededRandom;
    return this.createEnemies();
  }

  createEnemies(){
    let enemies = [];
    for(let i = 0; i < 5; ++i){
      enemies.push(new Enemy(this.seededRandom));
    }
    return enemies;
  }
};
