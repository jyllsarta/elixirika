export class Card {
  constructor(n, revealed = false){
    this.n = n;
    this.id = Math.floor(Math.random() * 1000000000);
    this.revealed = revealed;
  }

  reveal(){
    this.revealed = true;
  }

  hide(){
    this.revealed = false;
  }

  stringRepresentation(){
    if(this.revealed){
      return this.n;
    }
    else{
      return "?";
    }
  }
};
export default Card;
