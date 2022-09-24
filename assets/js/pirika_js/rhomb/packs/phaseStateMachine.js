const PhaseStart = require("./phaseStart");
const PhaseEnemyShoot = require("./phaseEnemyShoot");
const PhaseMain = require("./phaseMain");
const PhaseLock = require("./phaseLock");
const PhaseExecute = require("./phaseExecute");
const PhaseEnd = require("./phaseEnd");

module.exports = class PhaseStateMachine {
  // Phase の流れ
  // START
  // ---- 決着するまでループ ----
  // ENEMY_SHOOT
  // MAIN
  // LOCK
  // EXECUTE
  // ---- 決着するまでループ ----
  // END

  constructor() {
    this.phase = "START";
  }

  transfer(nextPhase, model){
    this.phase = nextPhase;
    this.fireOnPhaseChangeCallback(model);
  }

  transferToNextPhase(model){
    switch(this.phase){
      case "START":
        this.transfer("ENEMY_SHOOT", model);
        break;
      case "ENEMY_SHOOT":
        this.transfer("MAIN", model);
        break;
      case "MAIN":
        this.transfer("LOCK", model);
        break;
      case "LOCK":
        this.transfer("EXECUTE", model);
        break;
      case "EXECUTE":
        this.transfer("END", model);
        break;
      case "END":
        this.transfer("START", model);
        break;
    } 
  }

  // private

  fireOnPhaseChangeCallback(model){
    switch(this.phase){
      case "START":
        PhaseStart.enter(model);
        break;
      case "ENEMY_SHOOT":
        PhaseEnemyShoot.enter(model);
        break;
      case "MAIN":
        PhaseMain.enter(model);
        break;
      case "LOCK":
        PhaseLock.enter(model);
        break;
      case "EXECUTE":
        PhaseExecute.enter(model);
        break;
      case "END":
        PhaseEnd.enter(model);
        break;
    } 
  }
};
