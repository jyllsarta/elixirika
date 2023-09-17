<template>
  <!--ATTR_ENUMERATED_COERCION がdraggable="true" に対して出るけど普通にcompatのバグだと思うので無視-->
  <div
    draggable="true"
    class="card"
    :id="`card-${card.id}`"
    :class="card.viewClass() + `${touchDragging ? '' : ' not_touch'}`"
    :style="computedStyle"
    @mouseenter="onHover"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="inner">
      <div class="background">
        <div
          class="line_ur"
          v-for="(x, index) in rightLineCount"
          :key="index"
          :class="card.suit"
          :style="{
            left: (index + 1) * 10 + 'px',
            backgroundColor: `var(--color-${card.suit}1-${characterId})`,
          }"
        ></div>
        <div
          class="line_ul"
          v-for="(x, index) in leftLineCount"
          :key="index"
          :class="card.suit"
          :style="{
            right: (index + 1) * 10 + 'px',
            backgroundColor: `var(--color-${card.suit}1-${characterId})`,
          }"
        ></div>
      </div>
      <div class="icon">
        <div class="normal_icon" v-if="card.category === 'normal'">
          <div class="number" :class="card.suit">{{ card.number }}</div>
        </div>
        <div class="sender_icon" v-if="card.category === 'sender'">
          <div class="icon">
            <div class="upper_symbol">
              <div class="inner_cone"></div>
            </div>
            <div class="downer_symbol">
              <div class="inner_cone"></div>
            </div>
          </div>
        </div>
        <div class="special_icon" v-if="card.category === 'special'">
          <div class="big_symbol">
            <div class="inner_cube"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./packs/card";
import store from "./packs/store";

export default {
  store,
  props: {
    card: Card,
    characterId: Number,
  },
  data() {
    return {
      top: 0,
      left: 0,
      touchDragging: false,
    };
  },
  methods: {
    onHover(event) {
      if ("ontouchstart" in window) {
        // タッチデバイスではonHoverをポップさせない
        return;
      }
      this.$emit("hover", this.card);
      this.$store.commit("playSound", { key: "hover" });
    },
    onDragStart(e) {
      e.dataTransfer.setData("text/plain", this.card.id);
    },
    onDragEnd(e) {
      this.$emit("guiEvent", { type: "selectBoard", index: -1 });
      // なんかよく知らないが、sendcardやsendToCharacterの成功時にはpathは1要素なのでありがたく成功判定に使わせていただく
      // 失敗時は常に14だった
      if (e.path.length !== 1) {
        this.$store.commit("playSound", { key: "miss" });
      }
    },
    onTouchStart(e) {
      e.preventDefault();
    },
    onTouchMove(e) {
      e.preventDefault();
      const draggedElem = e.target;
      const touch = e.changedTouches[0];
      this.touchDragging = true;
      this.top = `${
        touch.pageY - window.pageYOffset - draggedElem.offsetHeight / 2
      }px`;
      this.left = `${
        touch.pageX - window.pageXOffset - draggedElem.offsetWidth / 2
      }px`;
    },
    onTouchEnd(e) {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const destination = document.elementFromPoint(
        touch.pageX - window.pageXOffset,
        touch.pageY - window.pageYOffset,
      );
      this.touchDragging = false;
      this.top = 0;
      this.left = 0;
      this.emitSendEvent(destination.id);
    },
    emitSendEvent(elementId) {
      const fieldIndex = parseInt(elementId.split("field-")[1] || -1);
      const isToAbility = elementId === "support-character";
      const cardId = this.card.id;
      if (isToAbility) {
        this.doSend("ability", cardId);
      } else {
        this.doSend(fieldIndex, cardId);
      }
    },
    doSend(target, cardId) {
      switch (target) {
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
    cancelDrag() {
      this.$emit("guiEvent", { type: "cancelDrag" });
      this.$store.commit("playSound", { key: "miss" });
    },
    sendToAbility(cardId) {
      this.$emit("guiEvent", { type: "sendToAbility", cardId });
    },
    sendToBoard(fieldIndex, cardId) {
      this.$emit("guiEvent", { type: "sendCard", fieldIndex, cardId });
    },
  },
  computed: {
    rightLineCount() {
      if (this.card.category !== "normal") {
        return 8;
      }
      return Math.ceil(this.card.number / 2);
    },
    leftLineCount() {
      if (this.card.category !== "normal") {
        return 8;
      }
      return Math.floor(this.card.number / 2);
    },
    computedStyle() {
      const style = {
        backgroundColor: `var(--color-${this.card.suit}3-${this.characterId})`,
        border: `3px solid var(--color-${this.card.suit}1-${this.characterId})`,
      };

      if (this.touchDragging) {
        style.position = "fixed";
        style.top = this.top;
        style.left = this.left;
        style.pointerEvents = "none";
      }
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.card {
  height: 140px;
  width: 100%;
  max-width: 200px;
  position: relative;
  border-radius: $radius;
  .inner {
    position: relative;
  }
  .background {
    position: absolute;
    overflow: hidden;
    height: 100%;
    width: 100%;
    .line_ur {
      position: absolute;
      width: 1px;
      height: 200px;
      top: 0;
      left: 5px;
      transform: rotate(-10deg);
    }
    .line_ul {
      position: absolute;
      width: 1px;
      height: 200px;
      top: 0;
      right: 5px;
      transform: rotate(10deg);
    }
  }
  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .normal_icon {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space_m;
      .number {
        font-size: 64px;
      }
      // この辺カラースキーム対応してもいいけど割と違和感ないのでそのままで
      .s {
        font-family: "Nova Square", cursive;
        text-shadow: 0px 0px 4px $blue1;
      }
      .h {
        font-family: "Cinzel Decorative", cursive;
        text-shadow: 0px 0px 4px $red1;
      }
      .j {
        font-family: "Coda", cursive;
        text-shadow: 0px 0px 4px $purple1;
      }
      .x {
        // Xでは文字描写はない想定
        font-family: "Nova Square", cursive;
        text-shadow: 0px 0px 4px $yellow1;
      }
    }
    .sender_icon {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 80px;
        height: 80px;
        position: absolute;
        .upper_symbol {
          width: 80px;
          height: 80px;
          position: absolute;
          top: 0px;
        }
        .downer_symbol {
          width: 80px;
          height: 80px;
          position: absolute;
          top: 20px;
        }
        .inner_cone {
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
    .special_icon {
      .big_symbol {
        width: 80px;
        height: 80px;
        position: relative;
        .inner_cube {
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
  &.selected.not_touch {
    transition: transform 0.2s;
    transform: rotate(5deg) translateY(-20px);
    transform-origin: bottom;
    border: 2px solid $white;
  }
}
</style>
