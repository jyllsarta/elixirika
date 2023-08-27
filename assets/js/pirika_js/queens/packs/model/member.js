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
    this.handRevealCount = 2;
  }

  addSpecialPoint(amount){
    this.specialPoint += amount;
  }

  // handRevealCount枚数分だけ手札を公開する
  revealHandMustShow(){
    // TODO: バフの適用
    this.hand.revealRange(this.handRevealCount);
  }
};
export default Member;
