<template lang="pug">
  .area
    .index
      | あかねのスキル
    .mp
      | MP: {{character.uniqueParameters.mp}}
    .buttons
      .button(
        v-for="(ability, index) in character.uniqueParameters.abilities"
        @click="$emit('guiEvent', {type: 'igniteSupportAbility', index: index})"
        @mouseover="$emit('guiEvent', {type: 'describeSupportAbility', index: index})"
        :class="{disabled: !character.hasSufficientMp(ability.cost), enabled: character.hasSufficientMp(ability.cost)}"
      )
        | {{ability.stringExpression()}}

</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    data(){
      return {
      };
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
    .buttons{
      display: flex;
      flex-wrap: wrap;
      padding: $space-m;
      gap: $space-m;
    }
    .button{
      padding: $space-m;
      font-size: $font-size-mini;
      &.enabled{
        &:hover{
          transform: scale(1.2);
        };
      };
      border: 1px solid $yellow2;
      background-color: $yellow3;
      &.disabled{
        border: 1px solid $gray1;
        background-color: transparent;
        opacity: $disabled-opacity;
      }
    }
  }
</style>
