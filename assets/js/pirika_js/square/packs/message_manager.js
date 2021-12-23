const Message = require("./message");
const MessagePriority = require("./message_priority");
const Constants = require("./constants");

module.exports = class MessageManager {
  constructor(model){
    this.model = model;
    this.messageMaster = new Message();
    this.messagePriorityMaster = new MessagePriority();
    this.currentMessage = {};
    this.id = this.reseedId(); // 更新検知用
    this.priority = 0; // 1アクションで複数registerされたときにどのセリフを表示するかの制御用
    this.lastOperationHistoryLength = 0; // アクション単位
  }

  register(when, params){
    const calibratedWhen = this.calibrateWhen(when, params);
    const records = this.messageMaster.getBySituation(this.model.characterId, calibratedWhen, this.model.chapter.index);
    this.pickAndUpdateMessage(records)
  }

  pickAndUpdateMessage(records){
    if(records.length === 0){
      console.warn(`no availvable message`); 
      return;
    }
    // ロジックに関わらない部分なので天然の乱数を使う
    const record = records[Math.floor(Math.random() * records.length)];
    const priority = this.messagePriorityMaster.getPriorityByWhen(record?.when);
    if(this.hasLessPriority(priority)){
      return;
    }
    this.currentMessage = record;
    this.id = this.reseedId();
    this.priority = priority === -1 ? this.priority : priority;
    this.lastOperationHistoryLength = this.model.operationHistory.length;
  }

  hasLessPriority(priority){
    // プライオリティ -1 は特別にコンフリクトに絶対負けず強制上書きを通す
    if(priority === -1){
      return false;
    }
    // アクションカウントが更新されていたらプライオリティ負けはしない
    if(this.lastOperationHistoryLength < this.model.operationHistory.length){
      return false;
    }
    // 1アクションの中で複数メッセージが誘発した場合、プライオリティが高いほうが勝つ。同着は更新を許す
    return priority < this.priority;
  }

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

  drawCalibration(when, model, params){
    if(model.deck.field.cards.length === 0){
      // && と等価だけど 変数名に意図を残す
      const canGetSenderCardFromSkill = model.character.getCallback("canGetSenderCardFromSkill", model.chapter.index)(model.character, model);
      if(canGetSenderCardFromSkill){
        return "noDeckButRemainsAbility";
      }
    }
    if(model.deck.field.cards.length > 30){
      return "draw1";
    }
    if(model.deck.field.cards.length > 10){
      return "draw2";
    }
    return "draw3";
  }

  sendToStarPaletteCalibration(when, model, params){
    const { toField } = params;
    if(toField.cards.length >= Constants.cardCountScoreBonusThreshold){
      return "starPaletteNew2";
    }
    return "starPaletteNew1";
  }
};
