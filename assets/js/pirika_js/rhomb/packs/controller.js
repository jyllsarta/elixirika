const Model = require("./model");

module.exports = class Controller {
  constructor(model) {
    this.model = model;
  }

  // tryLock自体を全部記録するのも正しいが、operationHistoryが長くなりすぎる
  // ヒストリーを取るにしてもロック結果のみを記録するようにする
  tryLock(){
    const r = this.model.range;
    const x = this.model.sight.x;
    const y = this.model.sight.y;
    const lockCandidates = this.model.findEnemiesInRange(x, y, r);
    lockCandidates.map(enemy=>this.lock(enemy.id));
  }

  startLocking(){
    this.model.sight.setLockingMode(true);
  }

  endLocking(){
    this.model.sight.setLockingMode(false);
    this.model.execute();
  }

  // private

  lock(enemy_id){
    this.model.lock(enemy_id);
  }
};
