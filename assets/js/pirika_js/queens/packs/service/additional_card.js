export class AdditionalCard {
  amount(state, board, card){
    return this._amountByLastCard(state, board, card) + this._amountByHandSize(state, board, card);
  }

  _amountByHandSize(state, board, card){
    // 残り手札がちょうど0枚になろうとしている場合は3枚
    // (判定タイミングではまだ手札が0枚になっていないため、唯一の残りカードがcardそのものであることで判定)
    if(state.player.hand.cards.length === 1 && card === state.player.hand.cards[0]){
      return 3;
    }
    return 0;
  }

  _amountByLastCard(state, board, card ){
    const lastCard = board.cards.slice(-1)[0];
    // 1枚目だったら0
    if(!lastCard){
      return 0;
    }

    // スーコネ条件
    // card.suits と lastCard.suitsが部分一致、かつ数値がプラマイ1なら1枚
    if(card.suits.some(suit=>lastCard.suits.includes(suit)) && Math.abs(card.n - lastCard.n) === 1){
      return 1;
    }

    // 数値が同じなら1枚
    if(card.n === lastCard.n){
      return 1;
    }

    // どれにも当てはまらない場合は0
    return 0;
  }
};
export default AdditionalCard;
