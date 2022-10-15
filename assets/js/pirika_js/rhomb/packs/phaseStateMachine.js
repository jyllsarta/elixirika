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
    this.phase = new PhaseStart();
  }

  transferTo(nextPhaseName, model){
    if(this.phase.leave){
      this.phase.leave(model);
    }
    this.phase = this.phaseEntity(nextPhaseName);
    this.phase.enter(model);
  }

  phaseEntity(phaseName){
    switch(phaseName){
      case "START":
        return new PhaseStart();
      case "ENEMY_SHOOT":
        return new PhaseEnemyShoot();
      case "MAIN":
        return new PhaseMain();
      case "LOCK":
        return new PhaseLock();
      case "EXECUTE":
        return new PhaseExecute();
      case "END":
        return new PhaseEnd();
    }
  }

  transferToNextPhase(model){
    const nextPhaseName = this.phase.nextPhaseName(model);
    this.transferTo(nextPhaseName, model);
  }

  // private
  fireOnPhaseChangeCallback(model){
  }
};
