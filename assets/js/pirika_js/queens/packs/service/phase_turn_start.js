export class PhaseTurnStart {
  enter(state){
    state.discard.sendAllCardsTo(state.deck);
    state.deck.shuffle();
    state.deck.cards.forEach(card => card.hide());

    state.enemy.hand.add(state.deck.draw());
    state.enemy.hand.add(state.deck.draw());
    state.enemy.hand.add(state.deck.draw());
    state.enemy.hand.add(state.deck.draw());
    state.enemy.hand.add(state.deck.draw());
    state.player.hand.add(state.deck.draw());
    state.player.hand.add(state.deck.draw());
    state.player.hand.add(state.deck.draw());
    state.player.hand.add(state.deck.draw());
    state.player.hand.add(state.deck.draw());

    state.player.hand.cards.forEach(card => card.reveal());
    state.enemy.hand.cards.slice(-1)[0].reveal();

    state.fieldEffectActivateCount = 0;
  }

  nextPhase(state){
    state.phase = "player_select";
  }
};
export default PhaseTurnStart;
