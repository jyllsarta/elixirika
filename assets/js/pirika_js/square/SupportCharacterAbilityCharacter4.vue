<template>
    <div class="area">
        <div class="index">アヤメの忍法帖</div>
        <div class="mp"><span>MP:</span><span>
                <NumeratableNumber class="mpvalue" :number="character.uniqueParameters.mp" :speed="0.1" :scaled="true"></NumeratableNumber>
            </span><span>{{maxMpMessage}}</span></div>
        <div class="bar">
            <div class="bg"></div>
            <div class="current" :style="{width: mpBarWidth}"></div>
        </div>
        <transition-group class="buttons" name="ability" tag="span">
            <SupportCharacterAbilityButton v-for="(ability, index) in character.uniqueParameters.abilities" @popclick="$emit('guiEvent', {type: 'igniteSupportAbility', index: index})" @popmouseover="$emit('guiEvent', {type: 'describeSupportAbility', index: index})" :key="ability.slot" :index="index" :ability="ability" :character="character" :isSelected="isSelected(index)" :isSmall="isSmall(index)"></SupportCharacterAbilityButton>
        </transition-group>
    </div>
</template>

<script>
  
  import SupportCharacterAbilityButton from "./SupportCharacterAbilityButton.vue"
  import NumeratableNumber from "./NumeratableNumber.vue";

  export default({
    data(){
      return {
      };
    },
    components: {
      SupportCharacterAbilityButton,
      NumeratableNumber,
    },
    props: {
      character: Object,
      model: Object,
    },
    computed: {
      mpBarWidth(){
        const percentage = Math.min(this.character.uniqueParameters.mp / 100, 1) * 100;
        return `${percentage}%`;
      },
      maxMpMessage(){
        if(this.character.uniqueParameters.mp >= this.character.uniqueParameters.maxMp){
          return "MAX!";
        }
        return "";
      }
    },
    methods: {
      isSelected(index){
        return this.model.focusingAbilityIndex === index;
      },
      isSmall(index){
        const length = this.character.uniqueParameters.abilities.length;
        if(length <= 4){
          return false;
        }
        return index >= (8 - length);
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 160px;
    height: 220px;
    background-color: $ingame-background;
    border: 2px solid $window-border;
    border-radius: $radius;
    padding: $space-m;
    .index{
      width: 100%;
      text-align: center;
    }
    .mp{
      display: flex;
      gap: $space-m;
      .mpvalue{
        background-color: $ingame-background;
        border-radius: $radius;
      }
    }
    .bar{
      width: 100%;
      position: relative;
      .bg{
        width: 100%;
        background-color: $purple2;
        height: 1px;
        position: absolute;
      }
      .current{
        background-color: $white;
        height: 1px;
        position: absolute;
      }
    }
    .buttons{
      display: flex;
      flex-wrap: wrap;
      padding: $space-m;
      gap: $space-m;
    }
  }
  
  .ability-enter-active {
    position: absolute;
    transition: all 0.2s;
  }
  .ability-leave-active {
    position: absolute;
    transition: all 0.2s;
  }
  .ability-enter-from{
    transform: scale(0);
    opacity: 0;
  }
  .ability-leave-to{
    transform: scale(0);
    opacity: 0;
  }
  .ability-move {
    transition: transform 0.2s;
  }
</style>
