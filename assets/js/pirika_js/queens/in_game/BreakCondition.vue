<template>
  <div class="condition" @click.right.prevent="showDetail">
    <div class="condenced_condition condition_content" v-if="condenced" :style="computedStyle"/>
    <div class="condition_content" v-else :style="computedStyle">
      <div class="label">
        {{ condition.type.toUpperCase() }}
      </div>
      <div class="value">
        <div class="gauge" :style="{width: countRatioPercent}"/>
        <div class="text">
          {{ condition.stringRepresentation() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    condition: Object,
    condenced: Boolean,
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
    },
    countRatioPercent(){
      if(this.condition.maxCount === 1){
        return "0%";
      }
      return `${(this.condition.remainCount / this.condition.maxCount * 100)}%`;
    }
  },
  methods: {
    showDetail(){
      this.$store.commit("showGlobalDetail", {type: "break_condition", params: this.condition});
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.condition{
  width: 100%;
  height: 100%;
  .condition_content{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: $white;
    background-color: var(--color-u3);
    border: 1px solid var(--color-u1);
    line-height: 100%;
    .label{
      width: 80%;
      font-size: $font-size-mini;
      text-align: center;
      border-bottom: 1px dotted $white;
    }
    .value{
      flex: 1;
      width: 100%;
      position: relative;
      .gauge{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: white;
        opacity: 0.15;
      }
      .text{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
