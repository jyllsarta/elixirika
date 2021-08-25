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
      }
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
