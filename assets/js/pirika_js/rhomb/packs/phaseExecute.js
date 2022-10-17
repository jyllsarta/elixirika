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
};
