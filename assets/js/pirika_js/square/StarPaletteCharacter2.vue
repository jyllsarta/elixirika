<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette2.svg")
    .gauge_container
      .gauge
        .foreground
          .fill(:style="{width: `${currentFillWidth * 100}%`}", :class="currentFillStatus")
          .lose_next(:style="{width: `${expectedEnergyDeltaWidth * 100}%`}" v-if="expectedEnergyDelta < 0")
          .gain_next(:style="{width: `${expectedEnergyDeltaWidth * 100}%`}" v-if="expectedEnergyDelta > 0")
    .number
      .energy
        .current
          NumeratableNumber(:number="energy", :speed="0.1")
        .max
          | / {{maxEnergy}}
    .delta_number(v-if="holdingCard" :class="holdingCardClass")
      | {{expectedEnergyDelta > 0 ? '+' : ''}}{{expectedEnergyDelta}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"
  import Constants from "./packs/constants";
  import NumeratableNumber from "./NumeratableNumber.vue";

  export default Vue.extend({
    props: {
      model: Model,
    },
    components: {
      NumeratableNumber,
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
        if(this.energy < Constants.bestEnergyLowLimit){
          return "low";
        }
        if(this.currentFillWidth > Constants.bestEnergyHighLimit){
          return "high";
        }
        return "best";
      },
      holdingCard(){
        return this.model.getHoldingCard();
      },
      expectedFieldScore(){
        const index = this.model.selectingBoardIndex;
        const card = this.holdingCard;
        const board = this.model.board.fields[index];
        const holdingCardIsSender = card && card.isSenderCard();
        if(board && card && holdingCardIsSender && this.model.cardStackRule(this.model.character, this.model, card, board)){
          return this.model.board.fields[index].scoreWithCard(card);
        }
        return 0;
      },
      expectedEnergyDelta(){
        return -this.consumptionPerCard + this.expectedFieldScore;
      },
      expectedEnergyDeltaWidth(){
        return Math.abs(this.expectedEnergyDelta) / this.maxEnergy;
      },
      holdingCardClass(){
        if(this.expectedEnergyDelta > 0){
          return "plus";
        }
        if(this.expectedEnergyDelta < 0){
          return "minus";
        }
        return "even";
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
          .gain_next{
            height: 100%;
            background-color: $red2;
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
      bottom: 50px;
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
    .delta_number{
      position: absolute;
      display: flex;
      left: 90px;
      top: 20px;
      line-height: 100%;
      width: 3rem;
      text-align: right;
      &.plus{
        color: $red1;
      }
      &.minus{
        color: $blue1;
      }
      &.even{
        color: $white;
      }
    }

  }
</style>
