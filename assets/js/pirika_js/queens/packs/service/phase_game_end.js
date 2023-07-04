export class PhaseGameEnd {
  enter(state){
  }

  nextPhase(state){
    if(state.persistentData.gameResult === "win"){
      this.writeToSave(true);
      state.phase = "unstarted";
      return;
    }
    else{
      this.writeToSave(false);
      state.phase = "unstarted";
      return;
    }
  }
};
export default PhaseGameEnd;
