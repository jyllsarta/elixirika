module.exports = class PhaseExecute {
  constructor(){
    this.name = "EXECUTE";
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
    hitBullets.map(bullet=>console.log("hit to player!"));
    model.bullets = remainBullets;
  }
};
