import Field from "./field";

export class State {
  constructor(){
    this.reset();
  }

  reset(){
    this.deck = new Field();
    this.discard = new Field();
    this.enemyHand = new Field();
    this.enemyBoard = new Field();
    this.playerHand = new Field();
    this.playerBoard = new Field();
    this.board = new Field();
    this.boardNext = new Field();
    this.phase = "unstarted";
  }
};
export default State;
