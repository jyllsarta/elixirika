module.exports = class PhaseLock {
  constructor(){
    this.name = "LOCK";
  }

  nextPhaseName(model){
    return "EXECUTE";
  }

 enter(model){
    console.log("lock Phase!");
  }

  handleMouseUp(e, model){
    this.finish(model);
  }

  handleMouseMove(e, model){
    model.pointer.x = e.offsetX;
    model.pointer.y = e.offsetY;
    const point = {x: e.offsetX, y: e.offsetY, tick: model.tick};
    model.lockStrokes.push(point);

    this.markBullets(model);

    // マンハッタン距離な世界でよしとする
    const delta = (Math.abs(e.movementX) + Math.abs(e.movementY)) * 0.0001;

    // この 0.0001 とかはマスターデータとして管理できるようにしたい
    model.tick += delta;
    model.mp -= delta;

    if(model.tick >= 1 || model.mp <= 0){
      this.finish(model);
    }
  }
  // private

  finish(model){
    if(model.tick >= 1){
      this.doFinish(model);
      return;
    }
    model.tick = Math.min(1, model.tick + 0.05);
    setTimeout(()=>this.finish(model), 20);
  }

  doFinish(model){
    model.phaseStateMachine.transferToNextPhase(model);
    model.tick = 0;
  }

  markBullets(model){
    const {x, y} = model.pointer;
    for(let bullet of model.bullets){
      const bulletPosition = bullet.partialStrokeAppliedPosition(model.tick);
      if(this.isInRange(x, y, bulletPosition.x, bulletPosition.y, 50)){
        bullet.mark();
      }
    }
  }

  // TODO(jyllsarta): 判定が真四角でいいかどうか検討
  isInRange(x1, y1, x2, y2, r){
    return Math.abs(x1 - x2) <= r && Math.abs(y1 - y2) <= r;
  }
};
