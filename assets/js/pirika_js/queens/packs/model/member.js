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
    this.breakCount = 0;
    this.stunTurn = 0;
  }

  applyBreak(){
    console.log("applyBreak");
    this.breakCount++;
    if(this.breakCount === 2){
      this.stunTurn++;
      return true;
    }
    return false;
  }

  reduceAtk(amount){
    this.currentAtk = Math.max(0, this.currentAtk - amount);
  }

  addSpecialPoint(amount){
    this.specialPoint += amount;
  }

  estimatedAtk(){
    // スタン中なら0
    if(this.stunTurn > 0){
      return 0;
    }
    // damageRate は 100分率
    // TODO: receiveDamageRateの考慮が必要ならここに追加
    const attackDamageRate = (this.buffState.getBuffValue("attackDamageRate") + 100) / 100;
    return Math.floor(this.currentAtk * attackDamageRate);
  }
};
export default Member;
