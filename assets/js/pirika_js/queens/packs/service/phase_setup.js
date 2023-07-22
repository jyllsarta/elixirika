import Card from "../model/card";
import BreakCondition from "../model/break_condition";
import Masterdata from "../masterdata";

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

    state.player.breakConditions.push(new BreakCondition("count", 50, true, null));
    state.enemy.breakConditions = this._fetchEnemyBreakConditions(state.questId, state);

    state.enemy.breakConditions.forEach(condition => condition.card?.reveal());
    state.player.breakConditions.forEach(condition => condition.card?.reveal());
  }

  nextPhase(state){
    state.phase = "turn_start";
  }

  _fetchEnemyBreakConditions(questId, state){
    const breakConditionMasters = Masterdata.getBy("break_conditions", "quest_id", [questId]).sort((a, b) => a.order - b.order);
    return breakConditionMasters.map((master) => {
      const maybeCard = BreakCondition.needsCard(master.type) ? state.deck.draw() : null;
      return new BreakCondition(master.type, master.count, true, maybeCard);
    });
  }
};
export default PhaseSetup;
