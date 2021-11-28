<template lang="pug">
  .area.with_inset_shadow
    .indice
      .index.with_shadow(v-for="index in [0,1,2,3]", :key="index", :field="board.fields[index]")
        span(:class="{big_combo: board.fields[index].overScoreBonusBorder()}")
          | {{board.fields[index].cards.length}}
        span
          | 枚 / {{board.fields[index].score()}}点
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
    height: unquote('max(350px, 57%)');
    display: flex;
    flex-direction: column;
    background-color: $ingame-background;
    padding: $space-ll;
    border-radius: $space-l;
    .indice{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: $space-m;
      .index{
        background-color: $ingame-background;
        border: 2px solid $yellow3;
        border-radius: $radius;
        padding: $space-m;
        width: 160px;
        text-align: center;
        .big_combo{
          font-weight: bold;
          color: $yellow1;
        }
      }
    }
    .fields{
      width: 100%;
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: $space-m;
    }
  }
</style>
