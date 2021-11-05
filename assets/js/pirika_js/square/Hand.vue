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
  import Constants from './packs/constants';

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
        const cardId = parseInt(event.item?.id?.split("card-")[1] || -1);
        this.doSend(fieldIndex, isToAbility, cardId);
      },
      onDragEndTouch(event){
        const target = this.findTargetFromTouchEvent(event)
        const cardId = parseInt(event.item?.id?.split("card-")[1] || -1);
        this.doSend(target, cardId);
      },
      findTargetFromTouchEvent(event){
        console.log(event)
        const {clientX, clientY} = event.originalEvent.changedTouches[0];
        const aspectRatio = window.screen.width / window.screen.height;
        const width = Math.max(window.screen.width, Constants.defaultWindowWidth);
        const virtualHeight = width / aspectRatio;
        const fieldIndex = Math.floor(clientX * 4 / width);
        const isFloorPart = clientY > (virtualHeight / 2);
        // 画面下半分かつ左端に出したときはアビリティ宛にする
        if(fieldIndex === 0 && isFloorPart){
          return "ability"
        }
        // 画面下半分かつ左端でもない場合にはキャンセル扱いにする
        if(fieldIndex !== 0 && isFloorPart){
          return "cancel";
        }
        return fieldIndex;
      },
      doSend(target, cardId){
        if(cardId === -1){
          console.warn("invalid drag!");
          return;
        }
        switch(target){
          case 1:
          case 2:
          case 3:
          case 4:
            this.sendToBoard(target, cardId);
            break;  
          case "cancel":
            console.log("cancel!");
            break;  
          case "ability":
            this.sendToAbility(cardId);
            break;  
          case -1:
            console.warn("no drag target!");
            break;
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
