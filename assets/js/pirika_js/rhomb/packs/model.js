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
    this.mp = 0;
    this.mpMax = 0;
    this.tick = 0;
    this.pointer = {x: 0, y: 0};
    this.lockStrokes = [];
    this.hpEnemy = 0;
    this.hpEnemyMax = this.hpEnemy;
  }

  initialize(seed){
    this.seededRandom = new SeededRandom(seed);
    this.isGameStarted = false;
    this.phaseStateMachine.transferTo("START", this);
    this.turn = 0;
    this.bullets = [];
    this.hp = 20;
    this.hpMax = this.hp;
    this.mp = 2;
    this.mpMax = this.mp;
    this.tick = 0;
    this.lockStrokes = [];
    this.hpEnemy = 10;
    this.hpEnemyMax = this.hpEnemy;
  }

  nextPhase(){
    this.phaseStateMachine.transferToNextPhase(this);
  }

  currentPhaseName(){
    return this.phaseStateMachine.phase.name;
  }

  // private
};
