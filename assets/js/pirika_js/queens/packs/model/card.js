export class Card {
  constructor(n, suits, revealed = false){
    this.n = n;
    this.id = Math.floor(Math.random() * 1000000000);
    this.revealed = revealed;
    this.suits = suits;
  }

  reveal(){
    this.revealed = true;
  }

  hide(){
    this.revealed = false;
  }

  stringRepresentation(){
    if(this.revealed){
      return this.n + this.suits.join(" ");
    }
    else{
      return "?";
    }
  }
};
export default Card;
