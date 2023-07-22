import CardBreakCondition from "../service/break_condition/card_break_condition.js";
import CountBreakCondition from "../service/break_condition/count_break_condition.js";

export class BreakCondition {
  constructor(type, count, revealed, card){
    this.id = Math.floor(Math.random() * 1000000000);
    this.revealed = revealed;
    this.type = type;
    this.card = card;
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
