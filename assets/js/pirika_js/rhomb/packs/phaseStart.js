module.exports = class PhaseStart {
  constructor(){
    this.name = "START";
    this.tick = 0;
  }

  nextPhaseName(model){
    return "ENEMY_SHOOT";
  }

  enter(model){
  }

  next(model){
    this.tick++;
    if(this.tick >= 2){
      model.isGameStarted = true;
      model.phaseStateMachine.transferToNextPhase(model);
    }
  }
};
