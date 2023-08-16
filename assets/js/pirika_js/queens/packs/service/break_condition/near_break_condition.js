export class NearBreakCondition {
  getCountReduction(state, board, condition, card){
    // card.n と condition.param1の距離が1以内なら1減らす
    return Math.abs(card.n - condition.param1) <= 1 ? 1 : 0;
  }

  stringRepresentation(condition){
    return `near(${condition.param1})`;
  }
};
export default NearBreakCondition;
