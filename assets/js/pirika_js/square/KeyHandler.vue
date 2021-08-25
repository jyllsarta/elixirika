<template lang="pug">
  .key_helper
    .current_board(v-if="controller")
      | CurrentBoard: {{controller.model.selectingBoardIndex}}
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
      },
      triggerKeyboardEvents(keyCode){
        console.log(keyCode);
        switch(keyCode){
          case "p":
            this.controller.startGame();
            break;
          case "r":
            this.controller.fillDraw();
            break;
          case "1":
            this.controller.selectBoard(0);
            break;
          case "2":
            this.controller.selectBoard(1);
            break;
          case "3":
            this.controller.selectBoard(2);
            break;
          case "4":
            this.controller.selectBoard(3);
            break;
          case "a":
            this.selectOrSend(0);
            break;
          case "s":
            this.selectOrSend(1);
            break;
          case "d":
            this.selectOrSend(2);
            break;
          case "f":
            this.selectOrSend(3);
            break;
          case "c":
            this.controller.commitSenderCard(this.controller.model.selectingBoardIndex);
            break;
          case "z":
            const index = this.currentCardIndex();
            const handCount = this.controller.model.hand.field.cards.length;
            if(index === -1){
              return;
            }
            this.controller.sendHandToBoard(index, this.controller.model.selectingBoardIndex);
            if(this.controller.model.hand.field.cards.length < handCount){
              this.selectOrSend(Math.max(index - 1, 0));                        
            }
            break;
          case "ArrowRight":
            this.turnRight();
            break;
          case "ArrowLeft":
            this.turnLeft();
            break;
          case "ArrowUp":
            this.controller.selectBoard(this.controller.model.selectingBoardIndex - 1);
            break;
          case "ArrowDown":
            this.controller.selectBoard(this.controller.model.selectingBoardIndex + 1);
            break;
          default:
            break;
        }
      },
      selectOrSend(idx){
        if(this.controller.model.hand.field.cards[idx]?.isSelected()){
          this.controller.sendHandToBoard(idx, this.controller.model.selectingBoardIndex);
        }
        else{
          this.controller.selectHand(idx);
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
    },
    data(){
      return {
        keyboard: null,
      };
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
</style>
