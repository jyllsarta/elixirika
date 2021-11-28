<template lang="pug">
  .area
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette3.svg")
    .container
      .star(v-for="param in params", :class="model.starPalette.isSatisfied(param) ?  'enabled' : 'disabled'")
        | {{stringExpression(param)}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"

  export default Vue.extend({
    props: {
      model: Model,
    },
    data(){
      return { 
        params: null,
      }
    },
    mounted(){
      this.params = this.model.character.getCallback("starPaletteParameter", this.model.chapter.index)()?.kinds;
    },
    methods: {
      stringExpression(param){
        return param.upper ? param.value + "+" : param.value;
      }
    },

  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    position: relative;
    .background{
      position: absolute;
      left: 15%;
      top: -15px;
      width: 70%;
      img{
        width: 100%;
      }
    }
    .container{
      position: absolute;
      left: 20%;
      width: 60%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: $space-ll;
      .star{
        border: 2px solid $yellow3;
        @include centering($height: 50px);
        width: 50px;
      }
      .enabled{
        border: 2px solid $yellow1;
        background-color: $yellow2;
      }
      .disabled{
        color: $white-o;
      }
    }
  }
</style>
