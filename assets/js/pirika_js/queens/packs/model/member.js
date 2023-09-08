import Field from "./field";
import BuffState from "./buff_state";

export class Member {
  constructor(isPlayer){
    this.hand = new Field();
    this.buffState = new BuffState();
    this.breakConditions = [];
    this.specialPoint = 0;
    this.maxSpecialPoint = 50;
    this.isPlayer = isPlayer;
    this.skillIds = [];
    this.currentAtk = 0;
    this.originalAtk = 0;
    this.reduceAtkPerCombo = 0;
    this.breakCount = 0;
    this.stunTurn = 0;
    this.usedSkillCountMap = {};
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
    this.specialPoint = Math.min(this.specialPoint, this.maxSpecialPoint);
  }

  reduceSpecialPoint(amount){
    this.specialPoint -= amount;
    this.specialPoint = Math.max(this.specialPoint, 0);
  }

  estimatedAtk(opponent){
    // スタン中なら0
    if(this.stunTurn > 0){
      return 0;
    }
    // damageRate は 100分率
    const attackDamageRate = (this.buffState.getBuffValue("attackDamageRate") + 100) / 100;
    const receiveDamageRate = (opponent.buffState.getBuffValue("receiveDamageRate") + 100) / 100; 
    return Math.floor(this.currentAtk * attackDamageRate * receiveDamageRate);
  }
};
export default Member;
