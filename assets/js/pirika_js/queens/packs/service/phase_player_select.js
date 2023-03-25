export class PhasePlayerSelect {
  enter(state){
  }

  nextPhase(state){
    // FIXME: ポチポチで進まないとだるいので、カードを選択していない状態だったら適当に端っこから切っていく
    while(state.playerBoard.cards.length < 2){
      state.playerBoard.add(state.deck.draw());
    }
    state.phase = "showdown";
  }
};
export default PhasePlayerSelect;
