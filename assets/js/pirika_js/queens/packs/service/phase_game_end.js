export class PhaseGameEnd {
  enter(state){
    state.uiState.prevPersistentData = {...state.persistentData};
    // 負け
    if(state.playerScore >= 8){
      state.persistentData.playerBankroll -= state.playerScore;
      state.persistentData.enemyBankroll += state.playerScore;
    }
    // 勝ち
    else{
      state.persistentData.playerBankroll += state.enemyScore;
      state.persistentData.enemyBankroll -= state.enemyScore;
    }
  }

  nextPhase(state){
    if(state.persistentData.enemyBankroll <= 0){
      state.persistentData.winCount++;
      state.persistentData.enemyBankroll = 50;
      state.phase = "unstarted";
      return;
    }
    state.phase = "setup";
  }
};
export default PhaseGameEnd;
