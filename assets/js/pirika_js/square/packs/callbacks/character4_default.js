let Card = require("../card");
const Constants = require("../constants");

module.exports = class Character4_Default {
  onGameStart(character, model){
    const { enemies } = character.getCallback("starPaletteParameter", model.chapter.index)();
    character.initializeEnemy(enemies);
  }

  onSendCard(character, model, card){
  }

  onSendToStarPalette = (character, model, field) => {
    const power = field.cards.length;
    character.damageToNextEnemy(power, model, false);
    character.uniqueParameters.mp += field.score();
  }

  onFillDraw(character, model){
    // シールドはドローしたタイミングで復活する
    let nextEnemy = character.uniqueParameters.enemies.find(enemy=>enemy.hp>0);
    if(!nextEnemy){
      console.warn("no target!")
      return;
    }
    if(nextEnemy.shield === 0){
      nextEnemy.shield = nextEnemy.shieldMax;
    }
  }

  calculateScore(character, model){
    return model.starPalette.score();
  }

  starPaletteParameter(){
    console.warn("エネミーリストはオーバーライド前提");
    return {
      enemies: [
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
