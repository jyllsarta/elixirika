<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette3.svg")
    .container
      .star(v-for="param in params", :class="model.starPalette.isSatisfied(param) ? 'enabled' : 'disabled'")
        .pattern_flash(v-if="model.starPalette.isSatisfied(param)")
        .pattern_flash2(v-if="model.starPalette.isSatisfied(param)")
        .text
          | {{stringExpression(param)}}
    .progress
      .current
        | {{ currentProgress }}
      .sep
        | /
      .total
        | {{ totalProgress }}
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
      currentProgress(){
        return this.params.filter(param=>this.model.starPalette.isSatisfied(param)).length
      },
      totalProgress(){
        return this.params.length
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";

  $palette_gold: #E9C6FF;
  $palette_gold2: #E9C6FF;
  $palette_base: #402A53;
  $palette_base2: #603d6b;
  $palette_base3: #271735;

  .star_palette{
    position: absolute;
    width: 100%;
    height: 100%;
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
      }
    }
    .container{
      position: absolute;
      top: -4px;
      left: 10%;
      width: 80%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: $space-ll * 2;
      .star{
        position: relative;
        border-radius: $radius;
        border: 2px solid $palette_gold;
        height: 50px;
        width: 50px;
        box-shadow: inset 6px 6px 6px $palette_base3, inset -6px -6px 4px $palette_base3;
        background-color: $palette_base2;
        transition: 0.5s background-color;
        .pattern_flash{
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          animation: pattern-flash 1s;
          border-radius: $radius;
          background-color: $palette_gold;
        }
        .pattern_flash2{
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          animation: pattern-flash 1s;
          animation-delay: 0.1s;
          border-radius: $radius;
          background-color: $palette_gold;
        }
        .text{
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }        
      }
      .enabled{
        border: 2px solid $palette_gold;
        background-color: $palette_gold;
        color: $palette_base;
        box-shadow: none;
        animation: flash 5s linear infinite;
      }
      .disabled{
        color: $white;
      }
    }
    .progress{
      position: absolute;
      width: 30%;
      height: 30px;
      bottom: 24px;
      left: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $space-m;
      .current{
        text-shadow: 0px 0px 4px $yellow1;
      }
      .total{
        text-shadow: 0px 0px 4px $blue1;
      }
    }
  }

  @keyframes flash{
    0% {
      box-shadow: 0 0 2px $palette_gold2;
    }
    50% {
      box-shadow: 0 0 10px $palette_base;
    }
  }
  @keyframes pattern-flash{
    0% {
      opacity: 0;
      transform: scale(4);
    }
    80% {
      opacity: 1;
      transform: scale(1);
    }
    90% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

</style>
