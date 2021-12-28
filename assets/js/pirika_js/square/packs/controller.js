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
    this.model.checkAndUpdateClearedChallenges();
    return {
      score: this.model.currentScore(),
      challenges: this.model.clearedChallenges
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
    this.model.messageManager.register("draw");
  }

  sendHandToBoard(handIndex, boardIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "sendHandToBoard"})
    const card = this.model.hand.field.cards[handIndex];
    const toField = this.model.board.fields[boardIndex];
    this._doSendCardToBoard(card, this.model.hand.field, toField);
  }

  sendStagedCardToBoard(boardIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "sendStagedCardToBoard"})
    const card = this.model.stagedField.field.cards[0];
    const toField = this.model.board.fields[boardIndex];
    this._doSendCardToBoard(card, this.model.stagedField.field, toField);
    this.model.hand.disselectAllCard();
  }

  _doSendCardToBoard(card, fromField, toField){
    if(!this.model.cardStackRule(this.model.character, this.model, card, toField)){
      console.warn("cannot stack this card!");
      this.unstageStagedCard();
      this.couldNotSendCard();
      return;
    }
    card.setSelected(false);

    fromField.sendCardById(card.id, toField)
    
    if(card.isSenderCard()){
      this._commitSenderCard(toField);
    }
    
    this.model.character.getCallback("onSendCard", this.model.chapter.index)(this.model.character, this.model, card);
    this.model.checkAndUpdateClearedChallenges();
    this.model.messageManager.register("sendCard");
  }

  _commitSenderCard(toField){
    let newField = new Field();
    toField.sendAllCardTo(newField);
    this.model.starPalette.fields.push(newField);
    this.model.character.getCallback("onSendToStarPalette", this.model.chapter.index)(this.model.character, this.model, newField);
    this.model.messageManager.register("sendToStarPalette", {toField: newField});
  }

  sendHandToStagedField(handIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "sendHandToStagedField"})
    const card = this.model.hand.field.cards[handIndex];
    const stagedField = this.model.stagedField;
    if(!stagedField.isSendable()){
      console.warn("cannot stack this card!");
      return;
    }
    card.setSelected(false);
    this.selectBoard(handIndex);
    stagedField.memoryStagedCardIsFrom(handIndex);
    this.model.hand.field.sendCardById(card.id, stagedField.field);
  }

  unstageStagedCard(){
    const stagedField = this.model.stagedField;
    if(!stagedField.isStaged()){
      return;
    }
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "unstageStagedCard"})
    const handIndex = stagedField.stagedCardIsFromIndex;
    const card = stagedField.field.cards[0];
    stagedField.field.sendCardById(card.id, this.model.hand.field, {index: handIndex})
    this.model.selectingBoardIndex = -1;
    card.setSelected(true);
  }

  sendHandToEmptyPocketAbility(handIndex){
    const emptyPocket = this.model.character.uniqueParameters.abilities?.find(ability=>ability.category === "cardPocket" && ability.card === null)
    if(!emptyPocket){
      this.model.messageManager.register("cannotIgniteAbilityCardPocketMaxCard");
      console.warn("no empty pocket!");
      return;
    }
    const callback = this.model.character.getCallback("isAbilityColded", this.model.chapter.index);
    if(callback && callback(this.model.character, this.model)){
      console.warn("cold now!");
      return;
    }
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "sendHandToEmptyPocketAbility"})
    const card = this.model.hand.field.cards[handIndex];
    card.selected = false;
    emptyPocket.card = card;
    this.model.hand.field.cards.splice(handIndex, 1);
    this.model.messageManager.register("abilityCardPocketSend");
  }

  selectHand(handIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "selectHand"})
    this.model.hand.disselectAllCard();
    this.model.hand.field.cards[handIndex]?.setSelected(true);
  }

  selectBoard(boardIndex){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "selectBoard"})
    // 非選択状態にするために -1 だけ例外で許可する
    if(boardIndex !== -1 && !this.model.board.fields[boardIndex]){
      console.warn(`no board field ${boardIndex}`);
      return;
    }
    this.model.selectingBoardIndex = boardIndex;
  }

  igniteSupportAbility(args){
    this.model.operationHistory.push({arguments: Object.values(arguments), name: "igniteSupportAbility"})
    const character = this.model.character;
    const { index } = args;
    const ability = character.uniqueParameters.abilities[index];
    if(!ability){
      console.warn(`cannot ignite ability!`)
      return;
    }
    if(ability.isRemovedAfterIgnite){
      character.uniqueParameters.abilities.splice(index, 1);
    }
    ability.ignite(character, this.model);
    this.model.checkAndUpdateClearedChallenges();
  }

  sendPlayLog(){
    let axios =  require("axios");
    return axios.post("/square/register_log",{
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

  cancelDrag(){
    this.model.messageManager.register("cancel");
  }

  couldNotSendCard(){
    this.model.messageManager.register("cannotSendCard");
  }
};
