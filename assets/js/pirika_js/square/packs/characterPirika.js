let Card = require("./card");

module.exports = class CharacterPirika {
  constructor(){
    // TODO: 今後キャラマスタ・セリフマスタに移動していく
    this.id = 1;
    this.name = "ピリカ";
    this.imageName = "faily";
    this.defaultMessage = "はーい！こんにちは\nまずはカード出してみてね";

    this.uniqueParameters = {
      // X X 11s 11h を追加する事ができる残り回数
      restAbilityCount: [1, 1, 1, 1]
    }
  }

  onGameStart(model){
    console.log("ピリカだよー");
  }

  igniteAbility(model, params){
    const abilityIndex = params;
    if(this.uniqueParameters.restAbilityCount[abilityIndex] <= 0){
      console.warn(`cannot ignite ability. rest count: ${this.uniqueParameters.restAbilityCount} / index:${abilityIndex}`)
      return;
    }
    this.uniqueParameters.restAbilityCount[abilityIndex] -= 1;
    switch(abilityIndex){
      case 0:
        model.hand.field.addCard(new Card( 0, "X", "special"));
        break;
      case 1:
        model.hand.field.addCard(new Card( 0, "X", "special"));
        break;
      case 2:
        model.hand.field.addCard(new Card( 11, "s", "sender"));
        break;
      case 3:
        model.hand.field.addCard(new Card( 11, "h", "sender"));
        break;
      default:
        break;
    }
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
