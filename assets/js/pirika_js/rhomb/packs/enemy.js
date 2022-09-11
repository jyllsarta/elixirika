module.exports = class Enemy {
  constructor(seededRandom, id) {
    this.initialize(seededRandom, id);
  }

  initialize(seededRandom, id){
    this.id = id;
    this.x = seededRandom.randInt(200, 600);
    this.y = seededRandom.randInt(200, 600);
    this.hp = 1;    
  }

  damage(value){
    this.hp -= value;
  }

  isAlive(){
    return this.hp > 0;
  }
};
