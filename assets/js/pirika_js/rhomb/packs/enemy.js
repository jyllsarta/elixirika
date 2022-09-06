module.exports = class Enemy {
  constructor(seededRandom) {
    this.initialize(seededRandom);
  }

  initialize(seededRandom){
    this.x = seededRandom.randInt(0, 10000) / 10000;
    this.y = seededRandom.randInt(0, 10000) / 10000;
    this.hp = 1;    
  }
};
