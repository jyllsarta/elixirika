const Constants = require("./constants");

module.exports = class AbilityCardPocket {
  constructor(slot, count = 3) {
    this.slot = slot;
    this.category = "cardPocket";
    this.card = null;
    this.isRemovedAfterIgnite = false;
    this.count = count;
  }

  stringExpression() {
    return this.card?.stringExpression()
      ? `[ ${this.card?.stringExpression()} ]/残${this.count}`
      : `からっぽ/残${this.count}`;
  }

  ignite(character, model) {
    if (!this.card) {
      model.messageManager.register("cannotIgniteAbilityCardPocketNoCard");
      model.soundManager.register("miss");
      return;
    }
    if (model.hand.field.cards.length >= Constants.maxHandCardNumber) {
      console.warn("max hand cards!");
      model.messageManager.register("cannotIgniteAbilityCardPocketMaxCard");
      model.soundManager.register("miss");
      return;
    }
    model.hand.field.addCard(this.card);
    this.card = null;
    model.messageManager.register("abilityCardPocketWithdraw");
    model.soundManager.register("special2");
  }
};
