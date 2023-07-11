export class CardBreakCondition {
  isValid(state, board, card, condition){
    if(!condition.card){
      console.warn("condition.card is null");
      return false;
    }

    // cardのsuitsとcondition.cardのsuitsが部分一致するか
    if(card.suits.some(suit => condition.card.suits.includes(suit))){
      console.log("suits matched");
      return true;
    }

    // 数字が一致しているか
    if(card.n === condition.card.n){
      console.log("number matched");
      return true;
    }

    // コンボ数がカードの数値以上か
    if(board.cards.length >= condition.card.n){
      console.log("combo matched");
      return true;
    }

    return false;
  }
};
export default CardBreakCondition;
