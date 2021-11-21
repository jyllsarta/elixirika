<template lang="pug">
  .area
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
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: $space-ss;
    .star{
      border: 1px solid $gray3;
      @include centering($height: 50px);
      width: 50px;
    }
    .enabled{
      background-color: $gray4;
    }
    .disabled{
      color: $white-o;
    }
  }
</style>
