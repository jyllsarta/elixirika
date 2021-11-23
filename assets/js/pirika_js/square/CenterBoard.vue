<template lang="pug">
  .area
    .indice
      .index(v-for="index in [0,1,2,3]", :key="index", :field="board.fields[index]")
        | {{board.fields[index].cards.length}}枚 / {{board.fields[index].score()}}点
    .fields
      Field(v-for="index in [0,1,2,3]", :key="index", :field="board.fields[index]" :selected="model.selectingBoardIndex === index")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Field from "./Field.vue"
  import Board from "./packs/board"
  import Model from "./packs/model"

  export default Vue.extend({
    props: {
      board: Board,
      model: Model,
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
    display: flex;
    flex-direction: column;
    .indice{
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space-m;
      .index{
        background-color: $ingame-background;
        border: 2px solid $yellow3;
        border-radius: $radius;
        padding: $space-m;
        width: 160px;
        text-align: center;
      }
    }
    .fields{
      width: 100%;
      height: 280px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space-m;
    }
  }
</style>
