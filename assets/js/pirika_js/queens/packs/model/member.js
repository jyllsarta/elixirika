import Field from "./field";

export class Member {
  constructor(isPlayer){
    this.hand = new Field();
    this.board = new Field();
    this.score = 0;
    this.specialPoint = 0;
    this.isPlayer = isPlayer;
    this.skillIds = [1, 2];
  }
};
export default Member;
