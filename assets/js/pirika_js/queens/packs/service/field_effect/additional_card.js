export class AdditionalCard {
  amount(state, enableLastCard = true, enableHandSize = true){
    let amount = 0;
    if(enableLastCard){
      amount += this._amountByLastCard(state);
    }
    if(enableHandSize){
      amount += this._amountByHandSize(state);
    }
    return amount;
  }

  _amountByHandSize(state){
    if(state.player.hand.cards.length === 0){
      return 3;
    }
    return 0;
  }

  _amountByLastCard(state){
    const [secondCard, lastCard] = state.board.cards.slice(-2);
    // どっちかがない場合は0
    if(!secondCard || !lastCard){
      return 0;
    }

    // スーコネ条件
    // card.suits と lastCard.suitsが部分一致、かつ数値がプラマイ1なら1枚
    if(lastCard.suits.some(suit=>secondCard.suits.includes(suit)) && Math.abs(lastCard.n - secondCard.n) === 1){
      return 1;
    }

    // 数値が同じなら1枚
    if(lastCard.n === secondCard.n){
      return 1;
    }

    // どれにも当てはまらない場合は0
    return 0;
  }
};
export default AdditionalCard;
