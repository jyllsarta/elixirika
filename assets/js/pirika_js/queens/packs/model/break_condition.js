import CardBreakCondition from "../service/break_condition/card_break_condition.js";
import CountBreakCondition from "../service/break_condition/count_break_condition.js";
import ExactBreakCondition from "../service/break_condition/exact_break_condition.js";
import NearBreakCondition from "../service/break_condition/near_break_condition.js";
import DistanceBreakCondition from "../service/break_condition/distance_break_condition.js";
import DiffBreakCondition from "../service/break_condition/diff_break_condition.js";
import ComboBreakCondition from "../service/break_condition/combo_break_condition.js";
import CardCountBreakCondition from "../service/break_condition/card_count_break_condition.js";

export class BreakCondition {
  constructor(type, count, param1, revealed, card){
    this.id = Math.floor(Math.random() * 1000000000);
    this.revealed = revealed;
    this.type = type;
    this.card = card;
    this.param1 = param1;
    this.maxCount = count;
    this.remainCount = count;
  }

  reveal(){
    this.revealed = true;
  }

  hide(){
    this.revealed = false;
  }

  stringRepresentation(){
    return this.asConditionModule().stringRepresentation(this);
  }
  
  asConditionModule(){
    switch(this.type){
      case "count":
        return new CountBreakCondition();
      case "card":
        return new CardBreakCondition();
      case "exact":
        return new ExactBreakCondition();
      case "near":
        return new NearBreakCondition();
      case "distance":
        return new DistanceBreakCondition();
      case "diff":
        return new DiffBreakCondition();
      case "combo":
        return new ComboBreakCondition();
      case "card_count":
        return new CardCountBreakCondition();
      default:
        console.warn("unknown type: ", this.type);
        return null;
    }
  }

  static needsCard(type){
    return type === "card";
  }
};
export default BreakCondition;
