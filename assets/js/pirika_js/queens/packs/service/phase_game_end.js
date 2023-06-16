import {Savedata} from "../savedata";

export class PhaseGameEnd {
  enter(state){
    state.uiState.prevPersistentData = {...state.persistentData};
    // 負け
    if(state.player.score >= 8){
      state.persistentData.playerBankroll -= state.player.score;
      state.persistentData.enemyBankroll += state.player.score;
    }
    // 勝ち
    else{
      state.persistentData.playerBankroll += state.enemy.score;
      state.persistentData.enemyBankroll -= state.enemy.score;
    }
  }

  nextPhase(state){
    if(state.persistentData.enemyBankroll <= 0){
      this.writeToSave(true);
      state.phase = "unstarted";
      return;
    }
    if(state.persistentData.playerBankroll <= 0){
      this.writeToSave(false);
      state.phase = "unstarted";
      return;
    }
    state.phase = "setup";
  }
};
export default PhaseGameEnd;
