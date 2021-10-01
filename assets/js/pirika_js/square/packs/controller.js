const Field = require("./field");
let Model = require("./model");
let Challenge = require("./challenge");
let Chapter = require("./chapter");
const Constants = require("./constants");

module.exports = class Controller {
  constructor() {
    this.model = null;
    if(typeof window !== 'undefined' && process.env.NODE_ENV !== 'production'){
      window.controller = this;
    }
  }

  dumpOperaionHistory(){
    const operations = {
      operationHistory: this.model.operationHistory,
      seed: this.seed,
      characterId: this.model.characterId,
      chapterId: this.model.chapterId,
    }
    return operations;
  }

  getStatus(){
    const challenge = new Challenge();
    const chapter = new Chapter().getAll().find(x=>x.id==this.model.chapterId);
    return {
      score: this.model.starPalette.score(),
      challenges: challenge.clearedChallengeIds(this.model, chapter.challenge_ids)
    }
  }

  loadOperationHistory(historyString){
    const operations = JSON.parse(historyString);
    this.model = new Model(operations.characterId, operations.chapterId, operations.seed);
    
    for(let operation of operations.operationHistory){
      this[operation.name](...operation.arguments);
    }
  }

  newGame(characterId, chapterId){
    this.seed = Math.floor(Math.random() * 1000000000);
    this.model = new Model(characterId, chapterId, this.seed);
    return this.model;
  }

  // 手札の引き直し
  // 手札を全て墓地に送る・デッキから引けるだけ引く
  fillDraw(force=false){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "fillDraw"})
    if(!force && this.model.hand.field.cards.length >= Constants.handCardNumber){
      return;
    }
    this.model.hand.disselectAllCard();
    this.model.hand.field.sendAllCardTo(this.model.graveyard.field);
    const drawNum = Math.min(this.model.deck.field.cards.length, 4);
    for(let i = 0; i < drawNum; ++i){
      this.model.hand.field.addCard(this.model.deck.field.draw());
    }
    this.selectHand(0);
  }

  // 手札からボードへの提出 基本アクション(deprecated: CUI版用)
  sendHandToBoard(handIndex, boardIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "sendHandToBoard"})
    const card = this.model.hand.field.cards[handIndex];
    const field = this.model.board.fields[boardIndex];
    if(!this.model.cardStackRule(card, field, this.model)){
      console.error("cannot stack this card!");
      return;
    }
    card.setSelected(false);
    this.model.hand.field.sendCardById(card.id, this.model.board.fields[boardIndex]);
    if(card.isSenderCard()){
      console.log("auto commit");
      this.commitSenderCard(boardIndex);
    }
  }

  sendHandToStagedField(handIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "sendHandToStagedField"})
    const card = this.model.hand.field.cards[handIndex];
    const stagedField = this.model.stagedField;
    if(!stagedField.isSendable()){
      console.error("cannot stack this card!");
      return;
    }
    card.setSelected(false);
    stagedField.memoryStagedCardIsFrom(handIndex);
    this.model.hand.field.sendCardById(card.id, stagedField.field);
  }

  unstageStagedCard(){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "unstageStagedCard"})
    const stagedField = this.model.stagedField;
    if(!stagedField.isStaged()){
      return;
    }
    const handIndex = stagedField.stagedCardIsFromIndex;
    const card = stagedField.field.cards[0];
    stagedField.field.sendCardById(card.id, this.model.hand.field, {index: handIndex})
    card.setSelected(true);
  }

  // ∞カード(ようは絵札) が積まれているボードを指定し、星座盤へ送る
  commitSenderCard(fieldIndex){
    //sendHandToBoard 側で操作が記録されているのでこれを積む必要がない
    //this.model.operationHistory.push({arguments: Object.values(arguments), name: "commitSenderCard"})
    if(!this.model.board.isSendable(fieldIndex)){
      console.error("cannot send");
      return;
    }
    let newField = new Field();
    this.model.board.fields[fieldIndex].sendAllCardTo(newField);
    this.model.starPalette.fields.push(newField);
  }

  selectHand(handIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "selectHand"})
    this.model.hand.disselectAllCard();
    this.model.hand.field.cards[handIndex]?.setSelected(true);
  }

  selectBoard(boardIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "selectBoard"})
    if(!this.model.board.fields[boardIndex]){
      console.error(`no board field ${boardIndex}`);
      return;
    }
    this.model.selectingBoardIndex = boardIndex;
  }

  sendPlayLog(){
    let axios =  require("axios");
    axios.post("/square/register_log",{
              _csrf_token: document.querySelector("meta[name=csrf-token]").attributes["content"].textContent,
              username: localStorage.rawNameSquare,
              log: this.dumpOperaionHistory(),
              seed: this.seed,
          }
        )
        .then((results) => {
          console.log(results);
          console.log("OK");
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
  }
};
