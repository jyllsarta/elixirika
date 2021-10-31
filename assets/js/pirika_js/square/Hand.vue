<template lang="pug">
  .area
    draggable.hand(@end="onDragEnd")
      Card(:card="card" v-for="card in cards" :key="card.id", @hover="onCardHover")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./Card.vue"
  import Hand from "./packs/hand"
  import draggable from 'vuedraggable'

  export default Vue.extend({
    props: {
      hand: Hand,
    },
    components: {
      draggable,
      Card
    },
    computed: {
      cards(){
        return this.hand.field.cards;
      },
    },
    methods: {
      onDragEnd(event){
        console.log(event)
        const fieldIndex = parseInt(event.originalEvent.target?.id?.split("field-")?.at(1) || -1);
        const isToAbility = event.originalEvent.target?.id === "support-character";
        const cardId = parseInt(event.item?.id?.split("card-")?.at(1) || -1);
        if(cardId === -1){
          console.warn("invalid drag!");
          return;
        }
        if(isToAbility){
          this.sendToAbility(cardId);
          return;
        }
        if(fieldIndex !== -1){
          this.sendToBoard(fieldIndex, cardId);
          return;
        }
      },
      sendToAbility(cardId){
        this.$emit("guiEvent", {type: "sendToAbility", cardId: cardId});
      },
      sendToBoard(fieldIndex, cardId){
        this.$emit("guiEvent", {type: "sendCard", fieldIndex: fieldIndex, cardId: cardId});
      },
      onCardHover(card){
        this.$emit("guiEvent", {type: "selectCard", card: card});
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 900px;
    height: 100px;
    .hand{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: $space-m;
    }
  }
</style>
