<template lang="pug">
  .area
    .index
      | アヤメの忍法帖
    .mp
      | MP: {{character.uniqueParameters.mp}}
    .bar
      .bg
      .current(:style="{width: mpBarWidth}")
    transition-group.buttons(name="ability")
      SupportCharacterAbilityButton(
        v-for="(ability, index) in character.uniqueParameters.abilities"
        @popclick="$emit('guiEvent', {type: 'igniteSupportAbility', index: index})"
        @popmouseover="$emit('guiEvent', {type: 'describeSupportAbility', index: index})"
        :key="ability.slot"
        :index="index"
        :ability="ability"
        :character="character"
        :isSelected="isSelected(index)"
        :isSmall="isSmall(index)"
      )
</template>

<script lang="typescript">
  import Vue from 'vue';
  import SupportCharacterAbilityButton from "./SupportCharacterAbilityButton.vue"

  export default Vue.extend({
    data(){
      return {
      };
    },
    components: {
      SupportCharacterAbilityButton
    },
    props: {
      character: Object,
      model: Object,
    },
    computed: {
      mpBarWidth(){
        const percentage = Math.min(this.character.uniqueParameters.mp / 100, 1) * 100;
        console.log(percentage)
        return `${percentage}%`;
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
    width: 150px;
    height: 220px;
    background-color: $ingame-background;
    border: 2px solid $yellow3;
    border-radius: $radius;
    padding: $space-m;
    .index{
      width: 100%;
      text-align: center;
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
  .ability-enter{
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
