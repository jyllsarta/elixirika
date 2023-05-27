export class PhaseTurnStart {
  enter(state){
    state.boardNext.sendAllCardsTo(state.board);
    state.enemy.hand.add(state.deck.draw());
    state.enemy.hand.add(state.deck.draw());
    state.player.hand.add(state.deck.draw());
    state.player.hand.add(state.deck.draw());
    state.boardNext.add(state.deck.draw());
    state.boardNext.add(state.deck.draw());

    state.player.hand.cards.forEach(card => card.reveal());

    state.round++;
    state.pot += state.round;
  }

  nextPhase(state){
    state.phase = "enemy_select";
  }
};
export default PhaseTurnStart;
