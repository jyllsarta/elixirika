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
  }

  addSpecialPoint(amount){
    this.specialPoint += amount;
  }
};
export default Member;
