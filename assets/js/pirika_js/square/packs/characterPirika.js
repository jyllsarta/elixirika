let Card = require("./card");

module.exports = class CharacterPirika {
  constructor(){
    // TODO: 今後キャラマスタ・セリフマスタに移動していく
    this.id = 1;
    this.name = "ピリカ";
    this.imageName = "faily";
    this.defaultMessage = "はーい！こんにちは\nまずはカード出してみてね";
  }

  onGameStart(model){
    console.log("ピリカだよー");
    model.deck.field.addCard(new Card( 0, "X", "special"));
    model.deck.field.addCard(new Card( 0, "X", "special"));
    // デッキに混ぜ物をしたので再シャッフルが必須
    model.deck.shuffle(model.seededRandom);
  }

  // model の状況では、 field の末尾に cardを積むことができる？
  cardStackRule(card, field, model){
    if(!field){
      return false;
    }
    if(field.cards.length === 0){
      return true;
    }
    const lastCard = field.getLastCard();
    // X のカードはどのカードにも重ねられるし、どのカードも重ねることができる
    if(lastCard.isSpecialCard() || card.isSpecialCard()){
      return true;
    }
    if(lastCard.isSenderCard()){
      return false;
    }
    if(lastCard.color() == card.color()){
      return false;
    }
    if(lastCard.number > card.number){
      return false;
    }
    return true;
  }
};
