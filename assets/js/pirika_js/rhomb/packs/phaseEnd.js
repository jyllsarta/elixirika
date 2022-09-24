module.exports = class PhaseEnd {
  constructor(){
    this.name = "END";
  }

 enter(model){
    console.log("end Phase!");
  }
};
