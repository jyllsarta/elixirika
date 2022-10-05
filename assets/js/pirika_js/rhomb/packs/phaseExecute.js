module.exports = class PhaseExecute {
  constructor(){
    this.name = "EXECUTE";
  }

  nextPhaseName(model){
    if(model.isGameOver){
      return "END";
    }
    return "ENEMY_SHOOT";
  }

 enter(model){
    console.log("execute Phase!");
    this.moveBullets(model);
    this.processHitBullets(model);
  }

  moveBullets(model){
    model.bullets.map(bullet=>bullet.moveOneTurn());
  }

  processHitBullets(model){
    const hitBullets = model.bullets.filter(bullet=>bullet.isHitToPlayer());
    const remainBullets = model.bullets.filter(bullet=>!bullet.isHitToPlayer());
    hitBullets.map(bullet=>model.hp--);
    model.isGameOver = model.hp <= 0;
    model.bullets = remainBullets;
  }
};
