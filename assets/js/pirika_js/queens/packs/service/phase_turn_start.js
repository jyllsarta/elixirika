export class PhaseTurnStart {
  enter(state){
    state.boardNext.sendAllCardsTo(state.board);
    state.enemyHand.add(state.deck.draw());
    state.enemyHand.add(state.deck.draw());
    state.playerHand.add(state.deck.draw());
    state.playerHand.add(state.deck.draw());
    state.boardNext.add(state.deck.draw());
    state.boardNext.add(state.deck.draw());

    state.round++;
    state.pot += state.round;
  }

  nextPhase(state){
    state.phase = "enemy_select";
  }
};
export default PhaseTurnStart;
