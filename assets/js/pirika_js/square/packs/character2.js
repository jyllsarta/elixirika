let Character2_Default = require("./callbacks/character2_default");
let Character2_1 = require("./callbacks/character2_1");
let Character2_2 = require("./callbacks/character2_2");
let Character2_3 = require("./callbacks/character2_3");
let Character2_4 = require("./callbacks/character2_4");
let AbilityCardPocket = require("./abilityCardPocket");
let Card = require("./card");

module.exports = class Character2 {
  constructor() {
    this.id = 2;
    this.name = "アリティ";
    this.defaultMessage = "イニシャライズ走りきりました、疎通確認いけます";
    this.bgm = "bgm3";

    this.uniqueParameters = {
      energy: 50,
      score: 0,
      abilities: [
        new AbilityCardPocket(1),
        new AbilityCardPocket(2),
        new AbilityCardPocket(3),
        new AbilityCardPocket(4),
      ],
      sandStormCount: 0,
      energyHistory: [],
    };
    this.defaultCallback = new Character2_Default();
    this.callbacks = {
      1: new Character2_1(),
      2: new Character2_2(),
      3: new Character2_3(),
      4: new Character2_4(),
    };
  }

  getCallback(callbackName, index) {
    return (
      this.callbacks[index][callbackName] || this.defaultCallback[callbackName]
    );
  }

  banSendCard(model, sendingField) {
    const length = sendingField.cards.length;
    if (length === 2 || length === 3) {
      model.setForceStalemate(
        "「2枚か3枚でスターパレットに送るべからず」の誓いを破った...",
        false,
      );
    }
  }

  banCardGap(model, toField) {
    const [prevCard, newCard] = toField.cards.slice(-2);
    if (!prevCard || !newCard) {
      return;
    }
    if (newCard.isSenderCard()) {
      return;
    }
    const diff = newCard.number - prevCard.number;
    if (diff === 0) {
      model.setForceStalemate(
        "「同じ数値のカードを重ねるべからず」の誓いを破った...",
        false,
      );
    }
  }

  banDiscard(model, sentCardLength) {
    if (sentCardLength > 0) {
      model.setForceStalemate(
        "「1枚たりとも捨札にするべからず」の誓いを破った...",
        false,
      );
    }
  }
};
