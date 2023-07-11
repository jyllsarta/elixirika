export class PhasePlayerSelect {
  enter(state){
  }

  nextPhase(state){
    state.player.hand.sendAllCardsTo(state.discard);
    state.board.sendAllCardsTo(state.discard);
    state.phase = "enemy_select";
  }
};
export default PhasePlayerSelect;
