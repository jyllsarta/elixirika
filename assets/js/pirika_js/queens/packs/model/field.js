export class Field {
  constructor(cards = []){
    this.cards = cards;
  }

  // 破壊的にカードを上書きする(ので、わざとらしい命名にしている)
  overwriteCards(cards){
    this.cards = cards;
  }

  shuffle() {
    let list = this.cards;

    for (var i = list.length - 1; i > 0; i--) {
      // seededRandom 導入時ここもやらないと死ぬ
      var j = Math.floor(Math.random() * i);
      if (i == j) continue;
      var k = list[i];
      list[i] = list[j];
      list[j] = k;
    }

    this.cards = list;
  }

  draw(){
    if(this.cards.length == 0){
      console.warn("drawing from empty field!");
      return null;
    }
    return this.cards.shift();
  }

  add(card){
    this.cards.push(card);
  }

  sendAllCardsTo(field){
    field.cards = field.cards.concat(this.cards);
    this.cards = [];
  }

  // referenceTargetValue を超えない範囲で、フィールドのカードのなるべく大きく解釈する
  // ゲームの実用上問題ない範囲でデフォルト値を決めておく
  // 現在はまだカードに多態性を持たせていないので、素朴に総和を取るだけでOK
  targetValue(referenceTargetValue = 999999){
    return this.cards.reduce((acc, card)=>acc + card.n, 0);
  }

  stringRepresentation(){
    if(this.cards.every(card => card.revealed)){
      return this.targetValue();
    }
    else{
      return "?";
    }
  }

  pick(index){
    const picked = this.cards.splice(index, 1);
    return picked[0];
  }
  
  pickByCardId(cardId){
    const cardIndex = this.cards.findIndex(card=>card.id == cardId);
    if(cardIndex === -1){
      console.warn(`couldn't find card.id == ${cardId}`);
      return null;
    }
    return this.pick(cardIndex);
  }
};
export default Field;
