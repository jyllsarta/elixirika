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
      },
      selectCard(args){
        const {card: card} = args;
        const cardIndex = this.controller.model.hand.field.cards.indexOf(card);
        this.controller.selectHand(cardIndex);
      },
      endGame(_args){
        this.controller.sendPlayLog()
        .then((_) => {
          console.log("send end");
          this.$emit("loadScene", {sceneName: "mainMenu"});
        });
      },
      fillDraw(_args){
        this.controller.fillDraw(true);
      },
      igniteSupportAbility(args){
        const { index } = args;
        console.log(`character: ${this.controller.model.character.name} のアビリティ ${index} 発動`);
        this.controller.igniteSupportAbility(args);
      },
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
</style>
