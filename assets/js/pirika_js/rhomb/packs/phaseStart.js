module.exports = class PhaseStart {
  constructor(){
    this.name = "START";
    this.tick = 0;
  }

  nextPhaseName(model){
    return "ENEMY_SHOOT";
  }

  enter(model){
    console.log("start Phase!");
  }

  next(model){
    this.tick++;
    if(this.tick >= 2){
      model.isGameStarted = true;
      model.phaseStateMachine.transferToNextPhase(model);
    }
  }
};
