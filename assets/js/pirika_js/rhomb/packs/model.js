const SeededRandom = require("./seededRandom");
const EnemyFactory = require("./enemyFactory");
const LockFactory = require("./lockFactory");
const Sight = require("./sight");
//const Constants = require("./constants");

module.exports = class Model {
  constructor() {
    this.boot();
  }

  boot(){
    this.seededRandom = new SeededRandom(-1);
    this.enemyFactory = new EnemyFactory(this.seededRandom);
    this.lockFactory = new LockFactory();

    this.enemies = [];
    this.sight = new Sight();
    this.locks = [];
    this.range = 50;
  }

  initialize(seed){
    this.seededRandom = new SeededRandom(seed);
    this.initializeEnemies();
    this.sight.updatePosition(0, 0);
  }

  initializeEnemies(){
    this.enemies = this.enemyFactory.createEnemies();
  }

  // modelに持つとちょっと権限過剰な感じするので、なんとかしたみ
  lock(enemy_id){
    const enemy = this.findEnemy(enemy_id);
    if(!enemy){
      return;
    }
    if(!this.sight.isLocking){
      return;
    }
    this.locks = this.lockFactory.lock(enemy, this.locks);
  }

  findEnemy(enemy_id){
    return this.enemies.find(enemy=>enemy.id === enemy_id);
  }

  // (x, y) から 距離 r 以下の enemy
  findEnemiesInRange(x, y, r){
    return this.enemies.filter(enemy=>this.distance(x, y, enemy.x, enemy.y) <= r);
  }

  // このゲームの距離はマンハッタン距離
  distance(x1, y1, x2, y2){
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
};
