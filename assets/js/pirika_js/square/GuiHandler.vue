<template lang="pug">
  .key_helper
</template>

<script lang="typescript">
    import Vue from 'vue';
    import Controller from "./packs/controller";

    export default Vue.extend({
    props: {
      controller: Controller
    },
    mounted(){
      this.$emit('initiate', this);
    },
    methods: {
      sendCard(args){
        const {fieldIndex: fieldIndex, cardId: cardId} = args;
        //TODO: 行儀悪い
        const card = this.controller.model.hand.field.cards.find(card=>card.id==cardId);
        const cardIndex = this.controller.model.hand.field.cards.indexOf(card);
        this.controller.sendHandToBoard(cardIndex, fieldIndex);
        this.controller.selectBoard(-1);        
      },
      sendToAbility(args){
        const { cardId } = args;
        const card = this.controller.model.hand.field.cards.find(card=>card.id==cardId);
        const cardIndex = this.controller.model.hand.field.cards.indexOf(card);
        this.controller.sendHandToEmptyPocketAbility(cardIndex);
      },
      selectCard(args){
        const {card: card} = args;
        const cardIndex = this.controller.model.hand.field.cards.indexOf(card);
        this.controller.selectHand(cardIndex);
      },
      selectBoard(args){
        const {index: index} = args;
        this.controller.selectBoard(index);
      },
      endGame(_args){
        this.controller.sendPlayLog()
        .then((_) => {
          console.log("score send complete");
          this.$emit("loadScene", {sceneName: "mainMenu"});
        });
      },
      fillDraw(_args){
        this.controller.fillDraw(true);
      },
      igniteSupportAbility(args){
        this.controller.igniteSupportAbility(args);
      },
      describeSupportAbility(args){
        this.controller.describeSupportAbility(args);
      },
      reset(_args){
        const characterId = this.controller.model.characterId;
        const chapterId = this.controller.model.chapterId;
        this.controller.newGame(characterId, chapterId);
        this.controller.fillDraw();
      },
      backToMainMenu(_args){
        this.$emit("loadScene", {sceneName: "mainMenu"});
      },
      cancelDrag(args){
        this.controller.cancelDrag();
      },
      couldNotSendCard(args){
        this.controller.couldNotSendCard();
      },
      prepareSendToAbility(args){
        this.controller.prepareSendToAbility();
      },
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
</style>
