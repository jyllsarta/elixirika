let Card = require("../card");
const Constants = require("../constants");

module.exports = class Character4_Default {
  onGameStart(character, model){
    const { enemies } = character.getCallback("starPaletteParameter", model.chapter.index)();
    character.initializeEnemy(enemies);
  }

  onSendCard(character, model, card, field){
  }

  onSendToStarPalette = (character, model, field) => {
    const power = field.cards.length;
    character.damageToNextEnemy(power, model, false);
    const maxMp = character.uniqueParameters.maxMp;
    const currentMp = character.uniqueParameters.mp;
    if(currentMp < maxMp){
      character.uniqueParameters.mp = Math.min(maxMp, currentMp + field.score());
    }
    model.calculateScore();
  }

  onFillDraw(character, model, sentCardLength){
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

  calculateScore = (character, model) => {
    const restCardBonus = this.isClearedMainTarget(character, model) ? this.restCardBonus(model) : 0;
    return model.starPalette.score() + restCardBonus;
  }

  restCardBonus = (model) => {
    return model.deck.field.cards.length * Constants.restCardBonus;
  }

  isClearedMainTarget(character, model){
    return character.isAllEnemyDefeated()
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
