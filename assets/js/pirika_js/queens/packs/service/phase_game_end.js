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
    // ゲームエンドしたら基本戻らない
    state.phase = "game_end";
  }
};
export default PhaseGameEnd;
