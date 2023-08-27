import Card from "../model/card";
import BreakCondition from "../model/break_condition";
import Masterdata from "../masterdata";
import SkillFacade from "./skill_facade";
import FieldEffect from "../model/field_effect";

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

    state.player.breakConditions = this._fetchPlayerBreakConditions(state.playerParams, state);
    state.enemy.breakConditions = this._fetchEnemyBreakConditions(state.questId, state);

    state.enemy.breakConditions.forEach(condition => condition.card?.reveal());
    state.player.breakConditions.forEach(condition => condition.card?.reveal());

    const quest = Masterdata.get("quests", state.questId);
    state.fieldEffect = new FieldEffect(quest.field_effect_id);

    state.player.skillIds = this._toSkillIds(state.playerParams.skills);
    state.enemy.skillIds = quest.skill_ids;

    // インスタントスキルをすべて発動する
    const instantSkillIds = this._toSkillIds(state.playerParams.instants);
    instantSkillIds.forEach((skillId) => {
      new SkillFacade().invoke(state, state.player, skillId, null);
    });
  }

  defaultDelay(){
    return 100;
  }

  nextPhase(state){
    state.phase = "turn_start";
  }

  _fetchEnemyBreakConditions(questId, state){
    const breakConditionMasters = Masterdata.getBy("break_conditions", "quest_id", [questId]).sort((a, b) => a.order - b.order);
    return breakConditionMasters.map((master) => {
      const maybeCard = BreakCondition.needsCard(master.type) ? state.deck.draw() : null;
      return new BreakCondition(master.type, master.count, master.param1, true, maybeCard);
    });
  }

  _fetchPlayerBreakConditions(playerParams, state){
    const breakConditionMasters = Masterdata.getBy("equipments", "id", playerParams.targets);
    return breakConditionMasters.map((master) => {
      const maybeCard = BreakCondition.needsCard(master.type) ? state.deck.draw() : null;
      return new BreakCondition(master.effect_key1, master.effect_value1, master.effect_value2, true, maybeCard);
    });
  }

  _toSkillIds(equipmentids){
    // equipment_id から skill_id を取得する
    return equipmentids.map((id) => {
      const equipment = Masterdata.get("equipments", id);
      return equipment.effect_value1;
    });
  }
};
export default PhaseSetup;
