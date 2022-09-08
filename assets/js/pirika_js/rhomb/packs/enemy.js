module.exports = class Enemy {
  constructor(seededRandom, id) {
    this.initialize(seededRandom, id);
  }

  initialize(seededRandom, id){
    this.id = id;
    this.x = seededRandom.randInt(0, 10000) / 10000;
    this.y = seededRandom.randInt(0, 10000) / 10000;
    this.hp = 1;    
  }
};
