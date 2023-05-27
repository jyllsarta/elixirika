export class PhasePlayerSelect {
  enter(state){
    state.lastRoundResult = "-";
  }

  nextPhase(state){
    // FIXME: ポチポチで進まないとだるいので、カードを選択していない状態だったら適当に端っこから切っていく
    while(state.player.board.cards.length < 2){
      state.player.board.add(state.player.hand.draw());
    }
    state.phase = "showdown";
  }
};
export default PhasePlayerSelect;
