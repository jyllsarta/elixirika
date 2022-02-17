<template lang="pug">
  .key_helper
</template>

<script lang="typescript">
    import Vue from 'vue';
    import Keyboard from "./packs/keyboard";
    import Controller from "./packs/controller";

    export default Vue.extend({
    props: {
      controller: Controller
    },
    mounted(){
      this.initiate();
    },
    methods: {
      initiate(){
        this.mountKeyboard();
      },
      mountKeyboard(){
        this.keyboard = new Keyboard();
        this.keyboard.mount();
        this.keyboard.addKeyboardEvent(this.triggerKeyboardEvents);
        this.keyboard.addKeyboardEventKeyUp(this.triggerKeyboardEventsKeyUp);
      },
      gameStatus(){
        if(this.controller.model.stagedField.isStaged()){
          return "staged";
        }
        if(this.controller.model.focusingAbilityIndex !== -1){
          return "selectAbility";
        }
        return "selectHand";
      },
      triggerKeyboardEvents(keyCode){
        switch(this.gameStatus()){
          case "staged":
            this.onKeyDownStaged(keyCode);
            break;
          case "selectHand":
            this.onKeyDownSelectHand(keyCode);
            break;
          case "selectAbility":
            this.onKeyDownSelectAbility(keyCode);
            break;
          default:
            console.warn("no handler mode selected!");
            break;
        }
      },
      onKeyDownSelectHand(keyCode){
        switch(keyCode){
          case "o":
            // デバッグ用
            this.controller.sendPlayLog();
            break;
          case "r":
            const characterId = this.controller.model.characterId;
            const chapterId = this.controller.model.chapterId;
            this.controller.newGame(characterId, chapterId);
            this.controller.operate("fillDraw", true);
            this.controller.operate("selectHand", 0);
            break;
          case "s":
            // sは強制
            this.controller.operate("fillDraw", true);
            break;
          case "x":
            // xはやさしい、事故防止付き
            if(this.controller.model.hand.field.cards.length === 4){
              return;
            }
            this.controller.operate("fillDraw");
            // xはやさしい、左端選択付き
            this.controller.operate("selectHand", 0);
            break;
          case "z":
            this.stageCard();
            break;
          case "1":
            this.selectOrIgniteAbility(0);
            break;
          case "2":
            this.selectOrIgniteAbility(1);
            break;
          case "3":
            this.selectOrIgniteAbility(2);
            break;
          case "4":
            this.selectOrIgniteAbility(3);
            break;
          case "a":
            this.selectOrIgniteAbility(0);
            break;
          case "ArrowUp":
            this.stageCard();
            break;
          case "ArrowRight":
            this.turnRight();
            break;
          case "ArrowLeft":
            this.turnLeft();
            break;
          default:
            break;
        }
      },
      onKeyDownSelectAbility(keyCode){
        const currentIndex = this.controller.model.focusingAbilityIndex;
        switch(keyCode){
          case "1":
            this.selectOrIgniteAbility(0);
            break;
          case "2":
            this.selectOrIgniteAbility(1);
            break;
          case "3":
            this.selectOrIgniteAbility(2);
            break;
          case "4":
            this.selectOrIgniteAbility(3);
            break;
          case "a":
            this.selectOrIgniteAbility(0);
            break;
          case "z":
            this.selectOrIgniteAbility(currentIndex);
            break;
          case "ArrowUp":
            this.selectOrIgniteAbility(currentIndex - 1);
            break;
          case "ArrowRight":
            this.controller.operate("disSelectAbility");
            break;
          case "ArrowLeft":
            this.controller.operate("disSelectAbility");
            break;
          case "ArrowDown":
            this.selectOrIgniteAbility(currentIndex + 1);
            break;
          case "Escape":
            this.controller.operate("disSelectAbility");
            break;
        }
      },
      onKeyDownStaged(keyCode){
        switch(keyCode){
          case "ArrowUp":
            this.sendStagedCard();
            break;
          case "ArrowRight":
            this.controller.operate("selectBoard", this.controller.model.selectingBoardIndex + 1);
            break;
          case "ArrowLeft":
            this.controller.operate("selectBoard", this.controller.model.selectingBoardIndex - 1);
            if(this.controller.model.selectingBoardIndex === -1){
              this.controller.prepareSendToAbility();
            }
            break;
          case "ArrowDown":
            this.controller.operate("unstageStagedCard");
            break;
          case "Escape":
            this.controller.operate("unstageStagedCard");
            break;
        }
      },
      triggerKeyboardEventsKeyUp(keyCode){
        switch(this.gameStatus()){
          case "staged":
            this.onKeyUpStaged(keyCode);
            break;
          case "selectHand":
            this.onKeyUpSelectHand(keyCode);
            break;
          case "selectAbility":
            this.onKeyUpSelectHand(keyCode);
            break;
          default:
            console.warn("no handler mode selected!");
            break;
        }
      },
      onKeyUpSelectHand(keyCode){
        switch(keyCode){
          default:
            break;
        }
      },
      onKeyUpSelectAbility(keyCode){
        switch(keyCode){
          default:
            break;
        }
      },
      onKeyUpStaged(keyCode){
        switch(keyCode){
          case "z":
            this.sendStagedCard();
            break;
          default:
            break;
        }
      },
      selectOrSend(idx){
        if(this.controller.model.hand.field.cards[idx]?.isSelected()){
          this.controller.operate("sendHandToBoard", idx, this.controller.model.selectingBoardIndex);
        }
        else{
          this.controller.operate("selectHand", idx);
        }
      },
      turnRight(){
        const cardIndex = this.currentCardIndex();
        const lastHandIndex = this.controller.model.hand.field.cards.length -1;
        if(cardIndex === lastHandIndex){
          return;
        }
        if(cardIndex === -1){
          this.selectOrSend(lastHandIndex);
        }
        else{
          this.selectOrSend(cardIndex + 1);
        }
      },
      turnLeft(){
        const cardIndex = this.currentCardIndex();
        if(cardIndex === 0){
          return;
        }
        if(cardIndex === -1){
          this.selectOrSend(0);
        }
        else{
          this.selectOrSend(cardIndex - 1);
        }
      },
      currentCardIndex(){
        return this.controller.model.hand.field.cards.findIndex(card=>card.isSelected());
      },
      stageCard(){
        const handIndex = this.currentCardIndex();
        if(handIndex === -1){
          return;
        }
        this.controller.operate("sendHandToStagedField", handIndex);
      },
      sendStagedCard(){
        if(this.controller.model.selectingBoardIndex === -1){
          this.controller.operate("unstageStagedCard");
          const handIndex = this.currentCardIndex();
          this.controller.operate("sendHandToEmptyPocketAbility", handIndex);
        }
        else{
          this.controller.operate("sendStagedCardToBoard", this.controller.model.selectingBoardIndex);
        }
        if(this.controller.model.hand.field.cards.every(card=>!card.isSelected())){
          const handCount = this.controller.model.hand.field.cards.length;
          const boardIndex = this.controller.model.selectingBoardIndex;
          const nearby = Math.min(handCount - 1, boardIndex);
          this.selectOrSend(nearby);                        
        }
      },
      selectOrIgniteAbility(index){
        const abilityCount = this.controller.model.character.uniqueParameters.abilities.length;
        if(index < 0 || index >= abilityCount){
          return;
        }
        if(this.controller.model.focusingAbilityIndex === index){
          this.controller.operate("igniteSupportAbility", {index: index});
          this.controller.operate("disSelectAbility");
        }
        else{
          this.controller.operate("selectAbility", index);
          this.controller.operate("describeSupportAbility", {index: index});
        }
      },
    },
    data(){
      return {
        keyboard: null,
      };
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
</style>
