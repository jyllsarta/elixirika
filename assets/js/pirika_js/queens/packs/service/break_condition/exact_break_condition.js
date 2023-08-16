export class ExactBreakCondition {
  // このカードでいくら減るかを返す
  getCountReduction(state, board, condition, card){
    return card.n === condition.param1 ? 1 : 0;
  }

  stringRepresentation(condition){
    return `exact(${condition.param1})`;
  }
};
export default ExactBreakCondition;
