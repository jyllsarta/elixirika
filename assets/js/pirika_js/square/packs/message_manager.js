const Message = require("./message");

module.exports = class MessageManager {
  constructor(model){
    this.model = model;
    this.messageMaster = new Message();
    this.currentMessage = {};
    // this.priority = 0; // 競合に困ったらこの値以下のプライオリティのregisterを無視するように実装してみる
  }

  register(when){
    const calibratedWhen = this.calibrateWhen(when);
    const records = this.messageMaster.getBySituation(this.model.characterId, calibratedWhen, this.model.chapter.index);
    if(records.length === 0){
      console.warn(`no availvable message: ${calibratedWhen}`); 
      return;
    }
    // ロジックに関わらない部分なので天然の乱数を使う
    const record = records[Math.floor(Math.random() * records.length)];
    this.currentMessage = record;
  }

  // メッセージ競合に困ったら1誘発が終わったところでこれを呼んで再度上書き可能にする
  //resetPriority(){}

  calibrateWhen(when){

    if(this[`${when}Calibration`]){
      return this[`${when}Calibration`](when, this.model);
    }
    return when;
  }

  sendCardCalibration(when, model){
    if(model.deck.field.cards.length > 30){
      return "sendCard1";
    }
    if(model.deck.field.cards.length > 10){
      return "sendCard2";
    }
    return "sendCard3";
  }
};
