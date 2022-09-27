const SeededRandom = require("./seededRandom");
const PhaseStateMachine = require("./phaseStateMachine");
const Masterdata = require("./masterdata");
//const Constants = require("./constants");

module.exports = class Model {
  constructor() {
    this.boot();
  }

  boot(){
    this.masterdata = new Masterdata();
    this.seededRandom = new SeededRandom(-1);
    this.phaseStateMachine = new PhaseStateMachine(this);
    this.isGameStarted = false;
    this.isGameOver = false;
  }

  initialize(seed){
    this.seededRandom = new SeededRandom(seed);
    this.isGameStarted = false;
    this.phaseStateMachine.transferTo("START", this);
  }

  nextPhase(){
    this.phaseStateMachine.transferToNextPhase(this);
  }

  // private
};
