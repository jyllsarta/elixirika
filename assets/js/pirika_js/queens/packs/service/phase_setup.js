import Card from "../model/card";

export class PhaseSetup {
  enter(state){
    state.reset();
    const cards = [];
    for(let i = 1; i <= 10; i++){
      cards.push(new Card(i));
      cards.push(new Card(i));
      cards.push(new Card(i));
      cards.push(new Card(i));
    }
    state.deck.overwriteCards(cards);
    state.deck.shuffle();

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
    state.boardNext.add(state.deck.draw());
    state.boardNext.add(state.deck.draw());
  }

  nextPhase(state){
    state.phase = "turn_start";
  }
};
export default PhaseSetup;
