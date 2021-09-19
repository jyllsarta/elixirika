<template lang="pug">
  .area
    .fields
      Field(v-for="field_id in [0,1,2,3]", :key="field_id", :field="board.fields[field_id]")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Field from "./Field.vue"
  import Board from "./packs/board"

  export default Vue.extend({
    props: {
      board: Board
    },
    components: {
      Field
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 800px;
    height: 350px;
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
