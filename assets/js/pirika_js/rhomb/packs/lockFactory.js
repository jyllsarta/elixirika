const Lock = require("./lock");

module.exports = class LockFactory {
  constructor() {
    this.lockIdCounter = 2000;
  }

  initialize(seededRandom){
    this.seededRandom = seededRandom;
    return this.createEnemies();
  }

  lock(enemy, locks){
    if(locks.some(lock=>lock.enemy.id === enemy.id)){
      return locks;
    }
    return locks.concat(new Lock(this.lockIdCounter++, enemy));
  }
};
