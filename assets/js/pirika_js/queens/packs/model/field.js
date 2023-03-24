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
    return this.cards.shift();
  }

  add(card){
    this.cards.push(card);
  }
};
export default Field;
