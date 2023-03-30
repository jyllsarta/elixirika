export class Card {
  constructor(n){
    this.n = n;
    this.id = Math.floor(Math.random() * 1000000000);
  }
};
export default Card;