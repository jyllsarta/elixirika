module.exports = class PhaseEnd {
  constructor(){
    this.name = "END";
  }

  nextPhaseName(model){
    return "START";
  }

 enter(model){
    console.log("end Phase!");
  }
};
