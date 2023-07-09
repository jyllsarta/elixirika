import Card from "../model/card";

export class PhaseSetup {
  enter(state){
    state.reset();
    const cards = [];
    for(let i = 1; i <= 10; i++){
      cards.push(new Card(i, ["s"]));
      cards.push(new Card(i, ["d"]));
      cards.push(new Card(i, ["c"]));
      cards.push(new Card(i, ["h"]));
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

    state.player.hand.cards.forEach(card => card.reveal());
  }

  nextPhase(state){
    state.phase = "turn_start";
  }
};
export default PhaseSetup;
