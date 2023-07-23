export class Break {
  // getCountReductionの結果分conditionのremainCountを減らし、0になったらtrueを返す
  execute(state, board, member, condition, card){
    const reduction = this.getCountReduction(state, board, condition, card);
    if(reduction === 0){
      return false;
    }

    condition.remainCount -= reduction;
    return condition.remainCount <= 0;
  }

  getCountReduction(state, board, condition, card){
    return condition.asConditionModule().getCountReduction(state, board, condition, card);
  }
};
export default Break;
