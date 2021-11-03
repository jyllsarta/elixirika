<template lang="pug">
  .area
    draggable.hand(:list="cards" @end="onDragEnd" @start="onDragStart" :move="checkMove" :sort="false" :group="'top'")
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
      checkMove(event){
        console.log(event);
        // TODO: ドラッグ開始タイミングで偽draggableオブジェクトを配置し、タッチ位置の変更を追跡してどこに落ちる予定なのかを把握できるようにする
        // draggable ネイティブの勝手なリソース移動は禁止するためにかならず false をリターンする
        return false;
      },
      onDragStart(event){
        console.log("start")
        const cardId = parseInt(event.item?.id?.split("card-")[1] || -1);
        if(cardId === -1){
          console.warn("invalid drag!");
          return;
        }
      },
      onDragEnd(event){
        if(event.originalEvent.dataTransfer){
          this.onDragEndMouse(event);
        }
        else{
          this.onDragEndTouch(event);
        }
      },
      onDragEndMouse(event){
        const fieldIndex = parseInt(event.originalEvent.target?.id?.split("field-")[1] || -1);
        const isToAbility = event.originalEvent.target?.id === "support-character";
        const cardId = parseInt(event.item?.id?.split("card-")?.at(1) || -1);
        this.doSend(fieldIndex, isToAbility, cardId);
      },
      onDragEndTouch(event){
        const {clientX, clitntY} = event.originalEvent.changedTouches[0];
        // TODO: 1200 決め打ちが気持ち悪い
        const fieldIndex = Math.floor(clientX * 4 / 1200);
        // TODO: タッチでもスズランにカードを渡せるようにする
        const isToAbility = false;
        const cardId = parseInt(event.item?.id?.split("card-")[1] || -1);
        this.doSend(fieldIndex, isToAbility, cardId);
      },
      doSend(fieldIndex, isToAbility, cardId){
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
        console.warn("no drag target!");
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
