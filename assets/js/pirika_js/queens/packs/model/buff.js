

export class Buff {
  constructor(master){
    this.id = Math.floor(Math.random() * 1000000000);
    this.master = master;
    this.restTurn = master.rest_turn;
  }
};
export default Buff;
