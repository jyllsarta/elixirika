export class PhaseEnemySelect {
  enter(state){
    // 将来的には敵AIを実装して出すカードを決定する
    state.enemyBoard.add(state.enemyHand.draw());
    state.enemyBoard.add(state.enemyHand.draw());    
  }

  nextPhase(state){
    state.phase = "player_select";
  }
};
export default PhaseEnemySelect;
