<template lang="pug">
  .area
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette2.svg")
    .container
      .spp
        | EN: {{model.character.uniqueParameters.energy}}
      .spp2
        | Cold: {{isColded}}
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
    computed: {
      isColded(){
        return this.model.character.getCallback("isAbilityColded", this.model.chapter.index)(this.model.character, this.model);
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    position: absolute;
    width: 100%;
    height: 100%;
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
    }
  }
</style>
