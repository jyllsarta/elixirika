import Field from "../model/field";

export class EnemyAiGreedy {
  select(state){
    const cards = state.enemy.hand.cards;
    const target = state.board.targetValue();

    return this.search(cards, target);
  }

  // 素朴に全通り試しても大したコストにならないので、全探索する
  search(cards, target){
    const n = cards.length;
    let best = [0, 1];
    let bestDistance = 999999999;

    for(let i = 0; i < n; i++){
      for(let j = 0; j < n; j++){
        if(i === j){
          continue;
        }
        let value = this.distance([cards[i], cards[j]], target);
        if(value < bestDistance){
          best = [i, j];
          bestDistance = value;
        }
      }
    }
    return [cards[best[0]].id, cards[best[1]].id];
  }

  // 理想からの距離
  distance(cards, target){
    const field = new Field(cards);
    const value = field.targetValue();
    const diff = target - value;

    // バーストした場合は大きくスコアを落とすが、バースト同士ではバースト量が小さい方を優先させる
    if(diff < 0){
      return diff * -10000;
    }
    return diff;
  }
};
export default EnemyAiGreedy;
