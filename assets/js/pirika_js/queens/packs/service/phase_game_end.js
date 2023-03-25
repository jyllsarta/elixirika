export class PhaseGameEnd {
  enter(state){
  }

  nextPhase(state){
    // ゲームエンドしたら基本戻らない
    state.phase = "game_end";
  }
};
export default PhaseGameEnd;
