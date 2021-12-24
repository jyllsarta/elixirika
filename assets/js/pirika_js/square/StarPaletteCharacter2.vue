<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette2.svg")
    .gauge_container
      .gauge
        .gauge_background
        .foreground
          .fill(:style="{width: `${currentFillWidth * 100}%`}")
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
      display: flex;
      width: 70%;
      left: 15%;
      height: 30px;
      top: $space-m * 3;
      align-items: center;
      justify-content: center;
      .gauge{
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: $radius;
        .gauge_background{
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: $gray4;
        }
        .foreground{
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          .fill{
            height: 100%;
            background-color: $yellow2;
          }
          .lose_next{
            height: 100%;
            background-color: $yellow3;
          }
        }
      }
    }
    .number{
      position: absolute;
      display: flex;
      left: 0;
      bottom: 0;
      padding: $space-m;
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
