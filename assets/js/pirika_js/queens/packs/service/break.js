export class Break {
  // getCountReductionの結果分conditionのremainCountを減らし、0になったらtrueを返す
  execute(state, board, actor, target, condition, card){
    const baseReduction = this.getCountReduction(state, board, condition, card);
    if(baseReduction === 0){
      return false;
    }

    // damageRate は 100分率
    const attackDamageRate = (actor.buffState.getBuffValue("attackDamageRate") + 100) / 100;
    const receiveDamageRate = (target.buffState.getBuffValue("receiveDamageRate") + 100) / 100;
    const reduction = Math.floor(baseReduction * attackDamageRate * receiveDamageRate);

    condition.remainCount -= reduction;
    return condition.remainCount <= 0;
  }

  getCountReduction(state, board, condition, card){
    return condition.asConditionModule().getCountReduction(state, board, condition, card);
  }
};
export default Break;
