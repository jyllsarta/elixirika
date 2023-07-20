export class CardBreakCondition {
  // このカードでいくら減るかを返す
  getCountReduction(state, board, card, condition){
    if(!condition.card){
      console.warn("condition.card is null");
      return 0;
    }

    // cardのsuitsとcondition.cardのsuitsが部分一致するか
    if(card.suits.some(suit => condition.card.suits.includes(suit))){
      console.log("suits matched");
      return 1;
    }

    // 数字が一致しているか
    if(card.n === condition.card.n){
      console.log("number matched");
      return 1;
    }

    // コンボ数がカードの数値以上か
    if(board.cards.length >= condition.card.n){
      console.log("combo matched");
      return 1;
    }

    return 0;
  }

  stringRepresentation(condition){
    if(!condition.card){
      console.warn("condition.card is null");
      return "";
    }
    return condition.card.stringRepresentation();
  }
};
export default CardBreakCondition;
