module.exports = class StarPalette {
  constructor() {
    this.initiate();
  }

  initiate(){
    this.fields = [];
  }

  isSatisfied(starPaletteParameter){
    const {value, order, upper} = starPaletteParameter;
    const satisfiedCount = upper ? this.cardLengthList().filter(x=>x>=value).length : this.cardLengthList().filter(x=>x==value).length;
    return order <= satisfiedCount;
  }

  willBeSatisfiedWith(starPaletteParameter, cardLength){
    const {value, order, upper} = starPaletteParameter;
    const satisfiedCount = upper ? this.cardLengthList().concat(cardLength).filter(x=>x>=value).length : this.cardLengthList().concat(cardLength).filter(x=>x==value).length;
    return !this.isSatisfied(starPaletteParameter) && order <= satisfiedCount;
  }

  cardLengthList(){
    return this.fields.map(field=>field.cards.length);
  }

  score(){
    return this.fields.reduce((x,y)=>x+y.score(), 0);
  }
};
