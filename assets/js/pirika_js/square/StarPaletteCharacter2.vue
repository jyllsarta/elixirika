<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette2.svg")
    .gauge_container
      .gauge
        .foreground
          .fill(:style="{width: `${currentFillWidth * 100}%`}", :class="currentFillStatus")
          .lose_next(:style="{width: `${currentLoseWidth * 100}%`}")
    .number
      .energy
        .current
          | {{energy}}
        .max
          | / {{maxEnergy}}
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
    },
    computed: {
      isColded(){
        return this.model.character.getCallback("isAbilityColded", this.model.chapter.index)(this.model.character, this.model);
      },
      energy(){
        return this.model.character.uniqueParameters.energy;
      },
      maxEnergy(){
        const { maxEnergy } = this.model.character.getCallback("starPaletteParameter", this.model.chapter.index)();
        return maxEnergy;
      },
      consumptionPerCard(){
        const { consumptionPerCard } = this.model.character.getCallback("starPaletteParameter", this.model.chapter.index)();
        return consumptionPerCard;
      },
      currentFillWidth(){
        return (this.energy - this.consumptionPerCard) / this.maxEnergy;
      },
      currentLoseWidth(){
        return this.consumptionPerCard / this.maxEnergy;
      },
      currentFillStatus(){
        if(this.currentFillWidth <= 0.2){
          return "low"
        }
        if(this.currentFillWidth >= 0.8){
          return "high"
        }
        return "best"
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
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
    .gauge_container{
      position: absolute;
      width: 630px;
      left: 190px;
      height: 38px;
      top: 23px;
      .gauge{
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: $radius;
        .foreground{
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          opacity: 0.8;
          .fill{
            height: 100%;
            transition: background-color 0.1s linear, width 0.1s linear;
            &.low{
              background-color: $blue1;
            }
            &.high{
              background-color: $red1;
            }
            &.best{
              background-color: $yellow1;
            }
          }
          .lose_next{
            height: 100%;
            background-color: $yellow2;
            animation: flash 4s linear infinite;
          }
        }
      }
    }
    @keyframes flash {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    .number{
      position: absolute;
      display: flex;
      left: $space-ll;
      bottom: 0;
      padding: $space-ll;
      line-height: 100%;
      .energy{
        display: flex;
        align-items: baseline;
        .current{
          font-size: $font-size-large;
          width: 3rem;
        }
      }
    }

  }
</style>
