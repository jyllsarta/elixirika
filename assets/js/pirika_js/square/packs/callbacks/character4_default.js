let Card = require("../card");
const Constants = require("../constants");

module.exports = class Character4_Default {
  onGameStart(character, model){
    console.log("あかねですー");
    const { enemies } = character.getCallback("starPaletteParameter", model.chapter.index)();
    character.initializeEnemy(enemies);
  }

  onSendCard(character, model, card){
  }

  onSendToStarPalette = (character, model, field) => {
    const power = field.cards.length;
    character.damageToNextEnemy(power);
    character.uniqueParameters.mp += field.score();
    if(character.isAllEnemyDefeated()){
      model.setForceStalemate();
    }
  }

  calculateScore(character, model){
    return model.starPalette.score();
  }

  starPaletteParameter(){
    return {
      enemies: [
        {id: 1, hp: 1, image: "kani"},
        {id: 2, hp: 1, image: "gob"},
        {id: 3, hp: 1, image: "kani"},
        {id: 4, hp: 1, image: "gob"},
        {id: 5, hp: 1, image: "ghost"},
      ]
    };
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

  canGetSenderCardFromSkill(character, model){
    return character.uniqueParameters.mp >= Constants.costOfAbilityAddSenderCard;
  }
};
