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

  turnDecay(){
    // すべてのバフのrestTurnを1減らす
    this.buffs.forEach(buff => {
      buff.restTurn--;
    })
    // restTurnが0以下のバフを削除する
    this.buffs = this.buffs.filter(buff => buff.restTurn > 0);
  }

  getBuffValue(key){
    // buff.master.key == keyのバフのeffect_valueをすべて合計する
    return this.buffs.filter(buff => buff.master.key == key).reduce((sum, buff) => sum + buff.master.effect_value, 0);
  }
};
export default BuffState;
