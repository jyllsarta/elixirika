export class BreakCondition {
  constructor(type, value, revealed, maybeCard){
    this.id = Math.floor(Math.random() * 1000000000);
    this.revealed = revealed;
    this.type = type;
    this.value = value;
    this.card = maybeCard;
  }

  reveal(){
    this.revealed = true;
  }

  hide(){
    this.revealed = false;
  }

  stringRepresentation(){
    if(this.card && this.revealed){
      return this.card.stringRepresentation();
    }
    else{
      return "?";
    }
  }
};
export default BreakCondition;
