export class PhasePlayerSelect {
  enter(state){
  }

  nextPhase(state){
    //余ったカード * 2 のMPを付与
    state.player.addSpecialPoint(state.player.hand.cards.length * 2);

    // ボードのお片付け
    state.player.hand.sendAllCardsTo(state.discard);
    state.board.sendAllCardsTo(state.discard);
    state.phase = "enemy_select";
  }
};
export default PhasePlayerSelect;
