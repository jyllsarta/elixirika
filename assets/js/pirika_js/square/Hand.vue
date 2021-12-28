<template lang="pug">
  .area
    draggable.hand(:list="cards" @end="onDragEnd" @start="onDragStart" :move="checkMove" :sort="false" :group="'top'")
      Card(
        :card="card",
        v-for="card in cards",
        :key="card.id",
        @hover="onCardHover",
        :characterId="model.characterId",
        :touchDragging="touchDragging"
      )
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
        const {clientX, type} = event.originalEvent;
        // タッチドラッグの場合においてのみ行き先表示を判定したい
        // 逆にマウスの場合は正規のDragEventが来て type が入っているので、 type にそれっぽいものが書いてあったら処理しない
        if(!clientX || type?.startsWith("drag")){
          return this.checkMoveDrag(event);
        }
        return this.checkMoveTouch(event)
      },
      checkMoveDrag(event){
        const {to} = event;
        const fieldIndex = parseInt(to.id?.split("field-")[1] || -1);
        this.selectBoard(fieldIndex);
        return false;
      },
      checkMoveTouch(event){
        const {clientX, clientY, type} = event.originalEvent;
        const target = this.findTargetFromTouchEvent(clientX, clientY);
        if(typeof(target) === "number" && this.model.selectingBoardIndex !== target){
          this.selectBoard(target);
        }
        if(target === "cancel" && this.model.selectingBoardIndex !== target){
          this.disselectBoard();
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
          const card = this.model.hand.field.cards.find(card=>card.id==cardId);
          this.$emit("guiEvent", {type: "selectCard", card: card});
          this.touchDragging = true;
        }
      },
      onDragEnd(event){
        this.touchDragging = false;
        this.disselectBoard();
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
        const touchAreaIndex = Math.floor(clientX * 6 / width);
        const isFloorPart = clientY > (virtualHeight * 4 / 5);
        // 画面下のほうはキャンセル扱いにする
        if(isFloorPart){
          return "cancel";
        }
        return this.touchAreaIndexToCardIndex(touchAreaIndex);
      },
      touchAreaIndexToCardIndex(touchAreaIndex){
        if(touchAreaIndex === 5){
          return -1;
        }
        if(touchAreaIndex === 0){
          return "ability";
        }
        return touchAreaIndex - 1;
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
      },
      selectBoard(index){
        if(this.model.selectingBoardIndex === index){
          return;
        }
        this.$emit("guiEvent", {type: "selectBoard", index: index});
      },
      disselectBoard(){
        if(this.model.selectingBoardIndex === -1){
          return;
        }
        this.$emit("guiEvent", {type: "selectBoard", index: -1});
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
