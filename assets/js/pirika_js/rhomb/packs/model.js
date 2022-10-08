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
    this.turn = 0;
    this.bullets = [];
    this.hp = 0;
    this.hpMax = 0;
    this.tick = 0;
  }

  initialize(seed){
    this.seededRandom = new SeededRandom(seed);
    this.isGameStarted = false;
    this.phaseStateMachine.transferTo("START", this);
    this.turn = 0;
    this.bullets = [];
    this.hp = 2;
    this.hpMax = this.hp;
    this.tick = 0;
  }

  nextPhase(){
    this.phaseStateMachine.transferToNextPhase(this);
  }

  currentPhaseName(){
    return this.phaseStateMachine.phase.name;
  }

  // private
};
