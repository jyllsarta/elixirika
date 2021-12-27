<template lang="pug">
  .area.with_inset_shadow(:style="styleBackground")
    .background(:style="{backgroundImage: `url(/images/square/svg/symbol_character${model.characterId}_small.svg`}")
    .front
      .indice
        .index.with_solid_shadow(
          v-for="index in [0,1,2,3]",
          :key="index",
          :field="board.fields[index]",
          :style="styleIndexBackground"
        )
          span(:class="{big_combo: board.fields[index].overScoreBonusBorder()}")
            | {{board.fields[index].cards.length}}
          span
            | 枚 / {{board.fields[index].score()}}点
      .fields
        Field(
          v-for="index in [0,1,2,3]",
          :key="index",
          :field="board.fields[index]"
          :selected="model.selectingBoardIndex === index"
          :characterId="model.characterId"
        )
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
    },
    computed: {
      styleBackground(){
        return {
          "background-color": `var(--bg2-${this.model.characterId})`,
        };
      },
      styleIndexBackground(){
        return {
          "background-color": `var(--bg3-${this.model.characterId})`,
        };
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    position: relative;
    width: 800px;
    height: unquote('max(350px, 57%)');
    border-radius: $radius;
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: 90px;
      opacity: 0.05;
      pointer-events: none;
    }
    .front{
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
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
          border: 2px solid $primary3;
          border-radius: $radius;
          padding: $space-m;
          width: 160px;
          text-align: center;
          .big_combo{
            font-weight: bold;
            color: $primary1;
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
  }
</style>
