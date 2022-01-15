<template lang="pug">
  .area
    .index(v-if="!character.uniqueParameters.abilities")
      | スキルはない
    .index(v-if="character.uniqueParameters.abilities")
      | スキルあるよ
    .buttons(v-if="character.uniqueParameters.abilities")
      .button(
        v-for="(ability, index) in character.uniqueParameters.abilities"
        @click="$emit('guiEvent', {type: 'igniteSupportAbility', index: index})"
        @mouseover="$emit('guiEvent', {type: 'describeSupportAbility', index: index})"
        :class="ability.card.suit"
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
      &:hover{
        transform: scale(1.2);
      }
      &.x{
        border: 1px solid $yellow2;
        background-color: $yellow3;
      }
      &.s{
        border: 1px solid $blue2;
        background-color: $blue3;
      }
      &.h{
        border: 1px solid $red2;
        background-color: $red3;
      }
      &.o{
        border: 1px dashed $gray1;
        background-color: $gray3;
      }
    }
  }
</style>
