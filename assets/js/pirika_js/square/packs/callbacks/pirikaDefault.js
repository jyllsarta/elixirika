let Card = require("../card");

module.exports = class PirikaDefault {
  onGameStart(character, model){
    console.log("ピリカだよー");
  }

  igniteAbility(character, model, params){
    const abilityIndex = params;
    if(character.uniqueParameters.restAbilityCount[abilityIndex] <= 0){
      console.warn(`cannot ignite ability. rest count: ${character.uniqueParameters.restAbilityCount} / index:${abilityIndex}`)
      return;
    }
    // Vue の監視しているArray なので、更新をかける場合は splice を使う
    character.uniqueParameters.restAbilityCount.splice(abilityIndex, 1, character.uniqueParameters.restAbilityCount[abilityIndex] - 1);
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

  // character, model の状況では、field の末尾に cardを積むことができる？
  cardStackRule(character, model, card, field){
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
