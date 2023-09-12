export class CardCountBreakCondition {
  // このカードでいくら減るかを返す
  getCountReduction(state, board, condition, card){
    return 1;
  }

  stringRepresentation(condition){
    return `[${condition.remainCount}]`;
  }
};
export default CardCountBreakCondition;
