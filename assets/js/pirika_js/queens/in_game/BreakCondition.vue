<template>
  <div class="condition" :style="computedStyle">
    {{ condition.stringRepresentation() }}
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    condition: Object,
  },
  computed: {
    computedStyle(){
      if(!this.condition?.card){
        return {};
      }
      // TODO: マルチカラーのカードが出たら対応
      if(this.condition.card.suits.length !== 1){
        return {};
      }
      const suit = this.condition.card.suits[0];

      const style = {
        backgroundColor: `var(--color-${suit}3)`,
        border: `1px solid var(--color-${suit}1)`,
      };
      return style;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.condition{
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $white;
  background-color: var(--color-u3);
  border: 1px solid var(--color-u1);
}
</style>
