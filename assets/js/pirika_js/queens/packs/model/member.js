import Field from "./field";

export class Member {
  constructor(isPlayer){
    this.hand = new Field();
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
