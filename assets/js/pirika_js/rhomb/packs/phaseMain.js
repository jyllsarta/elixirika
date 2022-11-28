module.exports = class PhaseMain {
  constructor() {
    this.name = "MAIN";
  }

  nextPhaseName(model) {
    return "LOCK";
  }

  enter(model) {}

  handleMouseDown(e, model) {
    model.phaseStateMachine.transferToNextPhase(model);
    model.soundManager.register("lock_start");
  }

  handleMouseMove(e, model) {
    model.pointer.x = e.offsetX;
    model.pointer.y = e.offsetY;
  }
};
