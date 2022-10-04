module.exports = class PhaseExecute {
  constructor(){
    this.name = "EXECUTE";
  }

 enter(model){
    console.log("execute Phase!");
    model.bullets.map(bullet=>bullet.moveOneTurn());
  }
};
