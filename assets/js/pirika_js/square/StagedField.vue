<template lang="pug">
  .area
    .card_container(:style="{left: leftGap}")
      Card(:card="stagedField.field.cards[0]" v-if="stagedField.field.cards[0]")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./Card.vue"
  import StagedField from "./packs/stagedField";
  import Model from "./packs/model";
  import Constants from "./packs/constants";

  export default Vue.extend({
    data(){
      return {
        gap: 155,
      }
    },
    props: {
      stagedField: StagedField,
      model: Model,
    },
    components: {
      Card,
    },
    computed: {
      leftGap(){
        const px = (this.model.selectingBoardIndex - 1.5) * this.gap;
        return px + "px";
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 160px;
    height: 100px;
    .card_container{
      pointer-events: none;
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  }
</style>
