import Field from "./field";
import BuffState from "./buff_state";

export class Member {
  constructor(isPlayer){
    this.hand = new Field();
    this.buffState = new BuffState();
    this.breakConditions = [];
    this.specialPoint = 0;
    this.isPlayer = isPlayer;
    this.skillIds = [];
    this.currentAtk = 0;
    this.originalAtk = 0;
    this.reduceAtkPerCombo = 0;
  }

  setAtk(atk){
    this.currentAtk = atk;
  }

  reduceAtk(amount){
    this.currentAtk = Math.max(0, this.currentAtk - amount);
  }

  addSpecialPoint(amount){
    this.specialPoint += amount;
  }
};
export default Member;
