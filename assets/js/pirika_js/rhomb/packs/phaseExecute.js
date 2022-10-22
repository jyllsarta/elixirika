const Bullet = require("./bullet");
module.exports = class PhaseExecute {
  constructor(){
    this.name = "EXECUTE";
  }

  nextPhaseName(model){
    if(model.isGameOver){
      return "END";
    }
    if(model.isWin){
      return "END";
    }
    return "ENEMY_SHOOT";
  }

  enter(model){
    console.log("execute Phase!");
    this.processMarkedBullets(model);
    this.moveBullets(model);
    this.processHitBullets(model);
    model.lockStrokes = [];
    model.updateWinState();
    setTimeout(()=>model.nextPhase(), 500);
  }

  leave(model){
    model.mp = Math.min(model.mpMax, model.mp + 0.2);
  }

  processMarkedBullets(model){
    const markedBullets = model.bullets.filter(bullet=>bullet.markedAt);

    for(let bullet of markedBullets){
      model.hpEnemy--;
    }
    model.bullets = model.bullets.filter(bullet=>!bullet.markedAt)

    // FIXME: ID固定
    // TODO 消した場所にそのまま出る
    const bonusBullets = this.bonusBullets(model, markedBullets);
    model.bullets = model.bullets.concat(bonusBullets);
  }

  moveBullets(model){
    model.bullets.map(bullet=>bullet.moveOneTurn());
  }

  processHitBullets(model){
    const hitBullets = model.bullets.filter(bullet=>bullet.isHitToPlayer());
    const remainBullets = model.bullets.filter(bullet=>!bullet.isHitToPlayer());
    hitBullets.map(bullet=>model.hp--);    
    model.bullets = remainBullets;
  }

  bonusBullets(model, markedBullets){
    let bullets = [];
    for(let markedBullet of markedBullets){
      if(markedBullet.isBonusBullet()){
        continue;
      }
      let bullet = new Bullet(model.masterdata.idTables.bullets[9999])
      bullet.x = markedBullet.x;
      bullet.y = markedBullet.y;
      bullets.push(bullet)
    }
    console.log(bullets)
    return bullets;
  }
};
