export class Break {
  // getCountReductionの結果分conditionのremainCountを減らし、0になったらtrueを返す
  execute(state, board, member, condition){
    const reduction = this._getCountReduction(state, board, condition);
    if(reduction === 0){
      return false;
    }

    condition.remainCount -= reduction;
    return condition.remainCount <= 0;
  }

  _getCountReduction(state, board, condition){
    const card = board.cards.slice(-1)[0];
    if(!card){
      return false;
    }

    return condition.asConditionModule().getCountReduction(state, board, card, condition);
  }
};
export default Break;
