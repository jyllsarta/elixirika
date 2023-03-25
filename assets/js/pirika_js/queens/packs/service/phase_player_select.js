export class PhasePlayerSelect {
  enter(state){
    // 将来的にはControllerからカードを選ばせる
    state.playerBoard.add(state.playerHand.draw());
    state.playerBoard.add(state.playerHand.draw());
  }

  nextPhase(state){
    state.phase = "showdown";
  }
};
export default PhasePlayerSelect;
