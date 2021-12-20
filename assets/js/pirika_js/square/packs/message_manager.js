const Message = require("./message");
const Constants = require("./constants");

module.exports = class MessageManager {
  constructor(model){
    this.model = model;
    this.messageMaster = new Message();
    this.currentMessage = {};
    this.id = this.reseedId();
    // this.priority = 0; // 競合に困ったらこの値以下のプライオリティのregisterを無視するように実装してみる
  }

  register(when, params){
    const calibratedWhen = this.calibrateWhen(when, params);
    const records = this.messageMaster.getBySituation(this.model.characterId, calibratedWhen, this.model.chapter.index);
    if(records.length === 0){
      console.warn(`no availvable message: ${calibratedWhen}`); 
      return;
    }
    // ロジックに関わらない部分なので天然の乱数を使う
    const record = records[Math.floor(Math.random() * records.length)];
    this.currentMessage = record;
    this.id = this.reseedId();
  }

  // メッセージ競合に困ったら1誘発が終わったところでこれを呼んで再度上書き可能にする
  //resetPriority(){}

  reseedId(){
    return Math.floor(Math.random() * 1000000000);
  }

  // メッセージ だしわけ 機構

  calibrateWhen(when, params){
    if(this[`${when}Calibration`]){
      return this[`${when}Calibration`](when, this.model, params);
    }
    return when;
  }

  sendCardCalibration(when, model, params){
    if(model.hand.field.cards.length === 0){
      return "noHand";
    }
    if(model.deck.field.cards.length > 30){
      return "sendCard1";
    }
    if(model.deck.field.cards.length > 10){
      return "sendCard2";
    }
    return "sendCard3";
  }

  sendToStarPaletteCalibration(when, model, params){
    console.log(params)
    const { toField } = params;
    if(toField.cards.length >= Constants.cardCountScoreBonusThreshold){
      return "starPaletteNew2";
    }
    return "starPaletteNew1";
  }
};
