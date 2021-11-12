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
    width: 200px;
    background-color: $ingame-background;
    .buttons{
      display: flex;
      padding: $space-m;
      gap: $space-s;
    }
    .button{
      padding: $space-m;
      &.enabled{
        &:hover{
          transform: scale(1.2);
        }
      } 
      border: 1px solid $yellow;
      background-color: $yellow-o;
      &.disabled{
        border: 1px solid $gray1;
        background-color: transparent;
        opacity: $disabled-opacity;
      }
    }
  }
</style>
