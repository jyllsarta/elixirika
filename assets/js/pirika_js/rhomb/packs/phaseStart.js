module.exports = class PhaseStart {
  static enter(model){
    model.isGameStarted = true;
    console.log("start Phase!");
  }
};
