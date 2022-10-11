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

    model.tick += 0.01;
    if(model.tick >= 1){
      this.doFinish(model);
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
};
