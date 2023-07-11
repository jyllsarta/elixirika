import CardBreakCondition from "./break_condition/card_break_condition.js";

export class Break {
  isValid(state, board, condition){
    const card = board.cards.slice(-1)[0];
    if(!card){
      return false;
    }

    const conditionModule = this.findConditionModule(condition.type);

    return new conditionModule().isValid(state, board, card, condition);
  }

  findConditionModule(type){
    const conditionModules = {
      "card": CardBreakCondition,
    };
    return conditionModules[type];
  }
};
export default Break;
