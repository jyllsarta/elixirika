import BreakCondition from "./break_condition";

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

  drawMany(amount){
    if(this.cards.length < amount){
      console.warn(`drawing ${amount} cards from field, but only ${this.cards.length} cards left`);
      return null;
    }
    const cards = this.cards.slice(0, amount);
    this.cards = this.cards.slice(amount);
    return cards;
  }

  add(card){
    this.cards.push(card);
  }

  addMany(cards){
    this.cards = this.cards.concat(cards);
  }

  sendAllCardsTo(field){
    field.cards = field.cards.concat(this.cards);
    this.cards = [];
  }

  pick(index){
    const picked = this.cards.splice(index, 1);
    return picked[0];
  }
  
  // pick はカードを取り出してフィールドからは削除される
  pickByCardId(cardId){
    const cardIndex = this.cards.findIndex(card=>card.id == cardId);
    if(cardIndex === -1){
      console.warn(`couldn't find card.id == ${cardId}`);
      return null;
    }
    return this.pick(cardIndex);
  }

  // find はカードを取り出さずにフィールドに残す
  findByCardId(cardId){
    return this.cards.find(card=>card.id == cardId);
  }

  asBreakConditions(){
    return this.cards.map(card=>new BreakCondition("card", 1, null, true, card));
  }
};
export default Field;
