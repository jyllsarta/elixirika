<template lang="pug">
  .area
    draggable.hand(:list="cards" @end="onDragEnd" @start="onDragStart" :move="checkMove" :sort="false" :group="'top'")
      Card(
        :card="card",
        v-for="card in cards",
        :key="card.id",
        @hover="onCardHover",
        :characterId="model.characterId"
      )
    draggable.pseudo_draggable(v-if="touchDragging" :group="'top'")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./Card.vue"
  import Hand from "./packs/hand"
  import draggable from 'vuedraggable'
  import Constants from './packs/constants';
  import Model from './packs/model';

  export default Vue.extend({
    props: {
      hand: Hand,
      model: Model
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
    data(){
      return {
        touchDragging: false,
      }
    },
    methods: {
      checkMove(event){
        const {clientX, clientY, type} = event.originalEvent;
        // タッチドラッグの場合においてのみ行き先表示を判定したい
        // 逆にマウスの場合は正規のDragEventが来て type が入っているので、 type にそれっぽいものが書いてあったら処理しない
        if(!clientX || type?.startsWith("drag")){
          return false;
        }
        const target = this.findTargetFromTouchEvent(clientX, clientY);
        if(typeof(target) === "number" && this.model.selectingBoardIndex !== target){
          this.$emit("guiEvent", {type: "selectBoard", index: target});
        }
        if(target === "cancel" && this.model.selectingBoardIndex !== target){
          this.$emit("guiEvent", {type: "selectBoard", index: -1});
        }
        // draggable ネイティブの勝手なリソース移動は禁止するためにかならず false をリターンする
        return false;
      },
      onDragStart(event){
        const cardId = parseInt(event.item?.id?.split("card-")[1] || -1);
        if(cardId === -1){
          console.warn("invalid drag!");
          return;
        }
        if(event.originalEvent.pointerType === "touch"){
          this.touchDragging = true;
        }
      },
      onDragEnd(event){
        this.touchDragging = false;
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
        if(isToAbility){
          this.doSend("ability", cardId);
        }
        else{
          this.doSend(fieldIndex, cardId);
        }
      },
      onDragEndTouch(event){
        const {clientX, clientY} = event.originalEvent.changedTouches[0];
        const target = this.findTargetFromTouchEvent(clientX, clientY)
        const cardId = parseInt(event.item?.id?.split("card-")[1] || -1);
        this.doSend(target, cardId);
      },
      findTargetFromTouchEvent(clientX, clientY){
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
          case 0:
          case 1:
          case 2:
          case 3:
            this.sendToBoard(target, cardId);
            break;  
          case "cancel":
            console.log("cancel!");
            this.cancelDrag();
            break;  
          case "ability":
            this.sendToAbility(cardId);
            break;  
          case -1:
            console.warn("no drag target!");
            this.cancelDrag();
            break;
        }
      },
      cancelDrag(){
        this.$emit("guiEvent", {type: "cancelDrag"});
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
    .pseudo_draggable{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
</style>
