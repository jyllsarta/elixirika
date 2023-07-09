import Field from "./field";

export class Member {
  constructor(isPlayer){
    this.hand = new Field();
    this.breakConditions = [];
    this.specialPoint = 0;
    this.isPlayer = isPlayer;
    this.skillIds = [1, 2];
  }
};
export default Member;
