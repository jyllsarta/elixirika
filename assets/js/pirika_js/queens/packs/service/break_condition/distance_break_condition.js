export class DistanceBreakCondition {
  getCountReduction(state, board, condition, card){
    // ボードの最後のカードとcard.nの距離がparam1と等しいなら1
    if(board.cards.length == 0){
      return 0;
    }
    const lastCard = board.cards[board.cards.length - 1];
    const distance = Math.abs(lastCard.n - card.n);
    if(distance == condition.param1){
      return 1;
    }
    return 0;
  }

  stringRepresentation(condition){
    return `dist(${condition.param1})`;
  }
};
export default DistanceBreakCondition;
