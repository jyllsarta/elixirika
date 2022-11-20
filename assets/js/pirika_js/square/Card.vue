<template>
    <div 
      draggable 
      class="card"
      :id="`card-${card.id}`"
      :class="card.viewClass() + `${touchDragging ? '' : ' not_touch'}`"
      :style="colorSchemedStyleBackground"
      @mouseenter="onHover"
      @dragstart="onDragStart"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
        <div class="background">
            <div class="line_ur" v-for="(x, index) in rightLineCount" :key="index" :class="card.suit" :style="{left: (index + 1) * 10 + 'px', backgroundColor: `var(--color-${card.suit}1-${characterId})`}"></div>
            <div class="line_ul" v-for="(x, index) in leftLineCount"  :key="index" :class="card.suit" :style="{right: (index + 1) * 10 + 'px', backgroundColor: `var(--color-${card.suit}1-${characterId})`}"></div>
        </div>
        <div class="icon">
            <div class="normal_icon" v-if="card.category==='normal'">
                <div class="number" :class="card.suit">{{ card.number }}</div>
            </div>
            <div class="sender_icon" v-if="card.category==='sender'">
                <div class="icon">
                    <div class="upper_symbol">
                        <div class="inner_cone"></div>
                    </div>
                    <div class="downer_symbol">
                        <div class="inner_cone"></div>
                    </div>
                </div>
            </div>
            <div class="special_icon" v-if="card.category==='special'">
                <div class="big_symbol">
                    <div class="inner_cube"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Card from "./packs/card";
  import store from "./packs/store";

  export default ({
    store,
    props: {
      card: Card,
      characterId: Number,
      touchDragging: Boolean,
    },
    methods: {
      onHover(event){
        if ("ontouchstart" in window) {
          // タッチデバイスではonHoverをポップさせない
          return;
        }
        this.$emit("hover", this.card);
        this.$store.commit("playSound", {key: "hover"});
      },
      onDragStart(e){
        e.dataTransfer.setData('text/plain', this.card.id);
      },
      onTouchStart(e){
        e.preventDefault();
      },
      onTouchMove(e) {
        e.preventDefault();
        const draggedElem = e.target;
        const touch = e.changedTouches[0];
        // TODO: この辺は:styleの紐づけで戦いたい
        e.target.style.position = "fixed";
        e.target.style.top = (touch.pageY - window.pageYOffset - draggedElem.offsetHeight / 2) + "px";
        e.target.style.left = (touch.pageX - window.pageXOffset - draggedElem.offsetWidth / 2) + "px";
      },
      onTouchEnd(e) {
        e.preventDefault();

        // TODO: この辺は:styleの紐づけで戦いたい
        var droppedElem = e.target;
        droppedElem.style.position = "";
        e.target.style.top = "";
        e.target.style.left = "";

        var touch = e.changedTouches[0];
        var destination = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
        console.log("newParentElem");
        this.emitEvent(destination.id);
      },
      emitEvent(elementId){
        const fieldIndex = parseInt(elementId.split("field-")[1] || -1);
        const isToAbility = elementId === "support-character";
        const cardId = this.card.id;
        if(isToAbility){
          this.doSend("ability", cardId);
        }
        else{
          this.doSend(fieldIndex, cardId);
        }
      },
      doSend(target, cardId){
        if(cardId === -1){
          console.warn("invalid drag!");
          this.$store.commit("playSound", {key: "miss"});
          return;
        }
        switch(target){
          case 0:
          case 1:
          case 2:
          case 3:
            this.sendToBoard(target, cardId);
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
        this.$store.commit("playSound", {key: "miss"});
      },
      sendToAbility(cardId){
        this.$emit("guiEvent", {type: "sendToAbility", cardId: cardId});
      },
      sendToBoard(fieldIndex, cardId){
        this.$emit("guiEvent", {type: "sendCard", fieldIndex: fieldIndex, cardId: cardId});
      },
    },
    computed: {
      rightLineCount(){
        if(this.card.category !== 'normal'){
          return 8;
        }
        return Math.ceil(this.card.number / 2);
      },
      leftLineCount(){
        if(this.card.category !== 'normal'){
          return 8;
        }
        return Math.floor(this.card.number / 2);
      },
      colorSchemedStyleBackground(){
        let style =  {
          backgroundColor: `var(--color-${this.card.suit}3-${this.characterId})`,
          border: `3px solid var(--color-${this.card.suit}1-${this.characterId})`,
        };
        return style;
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .card{
    height: 140px;
    width: 100%;
    max-width: 200px;
    position: relative;
    border-radius: $radius;
    .background{
      position: absolute;
      overflow: hidden;
      height: 100%;
      width: 100%;
      .line_ur{
        position: absolute;
        width: 1px;
        height: 200px;
        top: 0;
        left: 5px;
        transform: rotate(-10deg);
      }
      .line_ul{
        position: absolute;
        width: 1px;
        height: 200px;
        top: 0;
        right: 5px;
        transform: rotate(10deg);
      }
    }
    .icon{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .normal_icon{
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: $space_m;
        .number{
          font-size: 64px;
        }
        // この辺カラースキーム対応してもいいけど割と違和感ないのでそのままで
        .s{
          font-family: 'Nova Square', cursive;
          text-shadow: 0px 0px 4px $blue1;
        }
        .h{
          font-family: 'Cinzel Decorative', cursive;
          text-shadow: 0px 0px 4px $red1;
        }
        .j{
          font-family: 'Coda', cursive;
          text-shadow: 0px 0px 4px $purple1;
        }
        .x{
          // Xでは文字描写はない想定
          font-family: 'Nova Square', cursive;
          text-shadow: 0px 0px 4px $yellow1;
        }
      }
      .sender_icon{
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon{
          width: 80px;
          height: 80px;
          position: absolute;
          .upper_symbol{
            width: 80px;
            height: 80px;
            position: absolute;
            top: 0px;
          }
          .downer_symbol{
            width: 80px;
            height: 80px;
            position: absolute;
            top: 20px;
          }
          .inner_cone{
            position: absolute;
            border-top: 10px solid $white;
            border-left: 10px solid $white;
            width: 80px;
            height: 80px;
            transform: scale(0.707) rotate(45deg);
            border-radius: 4px;
          }
        }
      }
      .special_icon{
        .big_symbol{
          width: 80px;
          height: 80px;
          position: relative;
          .inner_cube{
            position: absolute;
            border: 10px solid $white;
            width: 80px;
            height: 80px;
            transform: scale(0.707) rotate(45deg);
            border-radius: 4px;
          }
        }
      }
    }
    &.selected.not_touch{
      transition: transform 0.2s;
      transform: rotate(5deg) translateY(-20px);
      transform-origin: bottom;
      border: 2px solid $white;
    }
  }
</style>
