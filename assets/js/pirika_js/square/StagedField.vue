<template lang="pug">
  .area
    Card(:card="stagedField.field.cards[0]" v-if="stagedField.field.cards[0]")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./Card.vue"
  import StagedField from "./packs/stagedField"

  export default Vue.extend({
    props: {
      stagedField: StagedField,
    },
    components: {
      Card,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 160px;
    height: 100px;
    .fields{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space-m;
    }
  }
</style>
