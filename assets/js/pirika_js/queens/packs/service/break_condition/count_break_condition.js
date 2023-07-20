export class CountBreakCondition {
  getCountReduction(state, board, card, condition){
    return card.n;
  }

  stringRepresentation(condition){
    return `[${condition.remainCount}]`;
  }
};
export default CountBreakCondition;
