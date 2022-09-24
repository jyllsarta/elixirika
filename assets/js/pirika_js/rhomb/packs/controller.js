module.exports = class Controller {
  constructor(model) {
    this.model = model;
  }

  nextPhase(){
    this.model.nextPhase();
  }
};
