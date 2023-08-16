export class DiffBreakCondition {
  getCountReduction(state, board, condition, card){
    // ボードの最後のカードとcard.nの距離ぶんだけ減らす
    if(board.cards.length == 0){
      return 0;
    }
    const lastCard = board.cards[board.cards.length - 1];
    const distance = Math.abs(lastCard.n - card.n);
    return distance;
  }

  stringRepresentation(condition){
    return `diff[${condition.remainCount}]`;
  }
};
export default DiffBreakCondition;
