module.exports = class StarPalette {
  constructor() {
    this.initiate();
  }

  initiate() {
    this.fields = [];
  }

  isSatisfied(starPaletteParameter) {
    const { value, order, upper } = starPaletteParameter;
    const satisfiedCount = upper
      ? this.cardLengthList().filter((x) => x >= value).length
      : this.cardLengthList().filter((x) => x == value).length;
    return order <= satisfiedCount;
  }

  willBeSatisfiedWith(starPaletteParameter, cardLength) {
    const { value, order, upper } = starPaletteParameter;
    const satisfiedCount = upper
      ? this.cardLengthList()
          .concat(cardLength)
          .filter((x) => x >= value).length
      : this.cardLengthList()
          .concat(cardLength)
          .filter((x) => x == value).length;
    return !this.isSatisfied(starPaletteParameter) && order <= satisfiedCount;
  }

  cardLengthList() {
    return this.fields.map((field) => field.cards.length);
  }

  score() {
    return this.fields.reduce((x, y) => x + y.score(), 0);
  }

  // アリティ視点でのスコア は 4を1点、 8を3点として数える
  arityStyleScore() {
    const lengths = this.cardLengthList();
    const fours = lengths.filter((x) => x === 4).length;
    const eights = lengths.filter((x) => x === 8).length;
    return fours + eights * 3;
  }
};
