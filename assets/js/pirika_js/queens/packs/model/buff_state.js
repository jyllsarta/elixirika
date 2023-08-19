import Masterdata from "../masterdata.js";
import Buff from "./buff.js";

export class BuffState {
  constructor(){
    this.buffs = [];
  }

  addBuff(id){
    const master = Masterdata.get("buffs", id);
    const buff = new Buff(master);
    this.buffs.push(buff);
  }
};
export default BuffState;
