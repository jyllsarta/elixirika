module.exports = class PhaseLock {
  constructor(){
    this.name = "LOCK";
  }

 enter(model){
    console.log("lock Phase!");
  }
};
