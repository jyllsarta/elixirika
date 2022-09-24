module.exports = class Controller {
  constructor(model) {
    this.model = model;
  }

  prepare(){
    if(this.model.isGameStarted){
      return;
    }
    const rand = Math.floor(Math.random() * 100000000);
    this.model.initialize(rand);
  }

  nextPhase(){
    this.model.nextPhase();
  }
};
