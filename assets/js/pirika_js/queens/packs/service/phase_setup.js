import Card from "../model/card";
import BreakCondition from "../model/break_condition";

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

    state.player.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.player.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.player.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.player.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.player.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.enemy.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.enemy.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.enemy.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.enemy.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));
    state.enemy.breakConditions.push(new BreakCondition("card", 1, true, state.deck.draw()));

    state.enemy.breakConditions.forEach(condition => condition.card.reveal());
    state.player.breakConditions.forEach(condition => condition.card.reveal());
  }

  nextPhase(state){
    state.phase = "turn_start";
  }
};
export default PhaseSetup;
