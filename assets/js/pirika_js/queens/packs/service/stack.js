export class Stack {
  isValid(state, board, card){
    const lastCard = board.cards.slice(-1)[0];
    // 1枚目は何でもOK
    if(!lastCard){
      return true;
    }

    // card.suits と lastCard.suitsが部分一致すればOK
    if(card.suits.some(suit=>lastCard.suits.includes(suit))){
      return true;
    }

    // 数値がプラマイ1ならOK
    if(Math.abs(card.n - lastCard.n) <= 1){
      return true;
    }

    // どれにも当てはまらない場合はNG
    return false;
  }
};
export default Stack;
