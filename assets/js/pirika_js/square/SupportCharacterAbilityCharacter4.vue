<template lang="pug">
  .area
    .index
      | アヤメの忍法帖
    .mp
      | MP: {{character.uniqueParameters.mp}}
    .buttons
      SupportCharacterAbilityButton(
        v-for="(ability, index) in character.uniqueParameters.abilities"
        @popclick="$emit('guiEvent', {type: 'igniteSupportAbility', index: index})"
        @popmouseover="$emit('guiEvent', {type: 'describeSupportAbility', index: index})"
        :index="index"
        :ability="ability"
        :character="character"
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
    },
    methods: {
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
    .buttons{
      display: flex;
      flex-wrap: wrap;
      padding: $space-m;
      gap: $space-m;
    }
  }
</style>
