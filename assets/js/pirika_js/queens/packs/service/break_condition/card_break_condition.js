export class CardBreakCondition {
  // このカードでいくら減るかを返す
  getCountReduction(state, board, condition, card){
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

    // コンボ数がカードの数値以上か(break判定時はboardにはまだcardが入っていないので+1する)
    if(board.cards.length + 1 >= condition.card.n){
      console.log("combo matched");
      return 1;
    }

    return 0;
  }

  stringRepresentation(condition){
    if(!condition.card){
      return "X";
    }
    return condition.card.stringRepresentation();
  }
};
export default CardBreakCondition;
