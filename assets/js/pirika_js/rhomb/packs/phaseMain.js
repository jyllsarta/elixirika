module.exports = class PhaseMain {
  constructor(){
    this.name = "MAIN";
  }

  nextPhaseName(model){
    return "LOCK";
  }

 enter(model){
    console.log("main Phase!");
  }

  handleMouseDown(e, model){
    model.phaseStateMachine.transferToNextPhase(model);
  }
};
