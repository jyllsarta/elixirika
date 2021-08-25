<template lang="pug">
  .key_helper
    .current_board
      | CurrentBoard: {{currentBoardId}}
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
            this.currentBoardId = 0;
            break;
          case "2":
            this.currentBoardId = 1;
            break;
          case "3":
            this.currentBoardId = 2;
            break;
          case "4":
            this.currentBoardId = 3;
            break;
          case "a":
            this.controller.sendHandToBoard(0, this.currentBoardId);
            break;
          case "s":
            this.controller.sendHandToBoard(1, this.currentBoardId);
            break;
          case "d":
            this.controller.sendHandToBoard(2, this.currentBoardId);
            break;
          case "f":
            this.controller.sendHandToBoard(3, this.currentBoardId);
            break;
          case "c":
            this.controller.commitSenderCard(this.currentBoardId);
            break;
          
          default:
            break;
        }
      },
    },
    data(){
      return {
        keyboard: null,
        currentBoardId : 0,
      };
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
</style>
