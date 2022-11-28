let Card = require("../card");
let AbilityAddCard = require("../abilityAddCard");
let AbilityCardPocket = require("../abilityCardPocket");
let AbilityShuffle = require("../abilityShuffle");

module.exports = class Character3_4 {
  onGameStart(character, model) {
    character.uniqueParameters.abilities = [
      new AbilityCardPocket(1),
      new AbilityCardPocket(2),
      new AbilityShuffle(3, 6),
      new AbilityAddCard(4, new Card(0, "x", "special")),
      new AbilityAddCard(5, new Card(0, "x", "special")),
    ];
  }

  starPaletteParameter() {
    return {
      kinds: [
        { value: 7, order: 1, upper: true },
        { value: 7, order: 2, upper: true },
        { value: 7, order: 3, upper: true },
        { value: 7, order: 4, upper: true },
        { value: 7, order: 5, upper: true },
        { value: 7, order: 6, upper: true },
        { value: 7, order: 7, upper: true },
      ],
    };
  }

  // character, model の状況では、field の末尾に cardを積むことができる？
  cardStackRule(character, model, card, field) {
    if (!field) {
      return false;
    }
    if (field.cards.length === 0) {
      return true;
    }
    const lastCard = field.getLastCard();
    // X のカードはどのカードにも重ねられるし、どのカードも重ねることができる
    if (lastCard.isSpecialCard() || card.isSpecialCard()) {
      return true;
    }
    if (lastCard.isSenderCard()) {
      return false;
    }
    if (lastCard.color() == card.color()) {
      return false;
    }
    // ミズハ の チャプター4だけ更に特別で、マイナス2まで乗せられる
    // 3 の上に 1 を乗せるのが合法
    if (lastCard.number - 2 > card.number) {
      return false;
    }
    return true;
  }
};
