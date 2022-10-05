module.exports = class PhaseLock {
  constructor(){
    this.name = "LOCK";
  }

  nextPhaseName(model){
    return "EXECUTE";
  }

 enter(model){
    console.log("lock Phase!");
  }
};
