<template lang="pug">
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
          case "r":
            this.controller.startGame();
            break;
          default:
            break;
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
  @import "stylesheets/constants";
</style>
