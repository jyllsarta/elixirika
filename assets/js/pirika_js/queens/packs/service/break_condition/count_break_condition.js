export class CountBreakCondition {
  getCountReduction(state, board, condition, card){
    return card.n;
  }

  stringRepresentation(condition){
    return `[${condition.remainCount}]`;
  }
};
export default CountBreakCondition;
