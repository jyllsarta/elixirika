export class PhaseEnemySelect {
  enter(state){
    state.enemy.hand.cards.forEach(card => card.reveal());
  }

  proceed(state){

  }

  nextPhase(state){
    state.board.sendAllCardsTo(state.discard);
    state.enemy.buffState.turnDecay();
    state.player.buffState.turnDecay();
    state.phase = "turn_start";
  }
};
export default PhaseEnemySelect;
