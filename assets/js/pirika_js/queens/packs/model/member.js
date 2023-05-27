import Field from "./field";

export class Member {
  constructor(isPlayer){
    this.hand = new Field();
    this.board = new Field();
    this.score = 0;
    this.specialPoint = 0;
    this.isPlayer = isPlayer; 
  }
};
export default Member;
