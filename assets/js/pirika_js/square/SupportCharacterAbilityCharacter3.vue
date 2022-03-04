<template lang="pug">
  .area
    .index(v-if="!character.uniqueParameters.abilities")
      | とくに
      | やる気がない
    .index(v-if="character.uniqueParameters.abilities")
      | ラズの能力
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
    border: 2px solid $window-border;
    border-radius: $radius;
    padding: $space-m;
    .index{
      width: 100%;
      text-align: center;
      white-space: pre-wrap;
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
