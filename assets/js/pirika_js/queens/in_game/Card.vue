<template>
  <div class="card" :style="frameStyle">
    <div class="content"
      @click="onCardClick(card.id)"
      :style="computedStyle"
    >
      {{condenced ? "" : card.stringRepresentation()}}
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    card: Object,
    state: Object,
    condenced: Boolean,
    highlightsOnSkillTarget: Boolean,
  },
  methods: {
    onCardClick(cardId){
      this.$emit('cardClick', cardId);
    }
  },
  computed: {
    selectSkillTarget(){
      return this.state.uiState.selectSkillTarget;
    },
    computedStyle() {
      if(this.card.suits.length !== 1){
        return {};
      }
      if(!this.card.revealed){
        return {};
      }
      const suit = this.card.suits[0];
      const style = {
        backgroundColor: `var(--color-${suit}3)`,
        border: `2px solid var(--color-${suit}1)`,
      };
      return style;
    },
    frameStyle(){
      const style = {
        borderColor: this.frameColor,
      };
      return style;
    },
    frameColor(){
      if(this.selectSkillTarget && this.highlightsOnSkillTarget){
        return "var(--color-u1)";
      }
      return "transparent";
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.card{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border: 4px solid transparent;
  .content{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-u3);
    border: 2px solid var(--color-u1);
    font-size: $font-size-large;
  }
}
</style>
