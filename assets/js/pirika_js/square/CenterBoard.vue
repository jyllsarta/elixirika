<template lang="pug">
  .area
    .fields
      Field(v-for="index in [0,1,2,3]", :key="index", :field="board.fields[index]")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Field from "./Field.vue"
  import Board from "./packs/board"

  export default Vue.extend({
    props: {
      board: Board,
    },
    components: {
      Field,
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