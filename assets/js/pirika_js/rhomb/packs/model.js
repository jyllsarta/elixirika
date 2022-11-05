const SeededRandom = require("./seededRandom");
const PhaseStateMachine = require("./phaseStateMachine");
const Masterdata = require("./masterdata");
const SoundManager = require("./sound_manager");
//const Constants = require("./constants");

module.exports = class Model {
  constructor() {
    this.boot();
  }

  boot(){
    this.masterdata = new Masterdata();
    this.seededRandom = new SeededRandom(-1);
    this.phaseStateMachine = new PhaseStateMachine(this);
    this.soundManager = new SoundManager();
    this.isGameStarted = false;
    this.isGameOver = false;
    this.isWin = false;
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
    this.isGameOver = false;
    this.isWin = false;
    this.phaseStateMachine.transferTo("START", this);
    this.turn = 0;
    this.bullets = [];
    this.hp = 10;
    this.hpMax = this.hp;
    this.mp = 1.5;
    this.mpMax = this.mp;
    this.tick = 0;
    this.lockStrokes = [];
    this.hpEnemy = 140;
    this.hpEnemyMax = this.hpEnemy;
  }

  nextPhase(){
    this.phaseStateMachine.transferToNextPhase(this);
  }

  currentPhaseName(){
    return this.phaseStateMachine.phase.name;
  }

  updateWinState(){
    const prevIsGameOver = this.isGameOver;
    this.isWin = this.hp > 0 && this.hpEnemy <= 0;
    this.isGameOver = this.hp <= 0 || this.hpEnemy <= 0;
    if(this.isGameOver && !prevIsGameOver){
      if(this.isWin){
        this.soundManager.register("win");
      }
      else{
        this.soundManager.register("lose");
      }
    }
  }

  // private
};
