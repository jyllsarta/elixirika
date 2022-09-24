module.exports = class PhaseMain {
  constructor(){
    this.name = "MAIN";
  }

 enter(model){
    console.log("main Phase!");
  }
};
