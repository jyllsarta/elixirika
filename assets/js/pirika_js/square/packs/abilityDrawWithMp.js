const Constants = require("./constants");

module.exports = class AbilityDrawWithMp {
  constructor(slot, drawCount, cost) {
    this.slot = slot;
    this.category = "drawWithMp";
    this.drawCount = drawCount;
    this.cost = cost;
    this.isRemovedAfterIgnite = false;
  }

  stringExpression() {
    const kanjiExpression = "零一二三四五六七八九十"[this.drawCount];
    if (!kanjiExpression) {
      console.warn(`draw ${this.drawCount} is not supported! set 0 to 10`);
    }
    return `${kanjiExpression}連宝札/${this.cost}`;
  }

  ignite(character, model) {
    if (character.uniqueParameters.mp < this.cost) {
      model.messageManager.register("cannotIgniteAbilityMagic");
      model.soundManager.register("miss");
      console.warn("insufficient mp!");
      return;
    }
    if (
      model.hand.field.cards.length + this.drawCount >
      Constants.maxHandCardNumber
    ) {
      console.warn("max hand cards!");
      model.soundManager.register("miss");
      model.messageManager.register("cannotIgniteAbilityMagicByCardOver");
      return;
    }
    const drawNum = Math.min(this.drawCount, model.deck.field.cards.length);
    character.uniqueParameters.mp -= this.cost;
    for (let i = 0; i < drawNum; ++i) {
      model.hand.field.addCard(model.deck.field.draw());
    }
    model.messageManager.register("abilityMagic");
    model.soundManager.register("special2");
  }
};
