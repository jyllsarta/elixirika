<template>
  <div class="card"
    @click="onCardClick(card.id)"
    :class="{selectSkillTarget: selectSkillTarget}"
    :style="computedStyle"
  >
    {{card.stringRepresentation()}}
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    card: Object,
    state: Object
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
      const suit = this.card.suits[0];
      const style = {
        backgroundColor: `var(--color-${suit}3)`,
        border: `2px solid var(--color-${suit}1)`,
      };
      return style;
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
  border: 1px solid $accent1;

  &.selectSkillTarget{
    background-color: $accent1;
  }
}
</style>
