<template lang="pug">
  .area
    .index(v-if="!character.uniqueParameters.abilities")
      | ミズハにスキルはない
    .index(v-if="character.uniqueParameters.abilities")
      | ミズハにスキルはない..というのは嘘だ
    .buttons(v-if="character.uniqueParameters.abilities")
      .button(
        v-for="(ability, index) in character.uniqueParameters.abilities"
        @click="$emit('guiEvent', {type: 'igniteSupportAbility', index: index})"
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
    width: 200px;
    background-color: $ingame-background;
    .buttons{
      display: flex;
      padding: $space-m;
      gap: $space-s;
      flex-wrap: wrap;
    }
    .button{
      padding: $space-m;
      &:hover{
        transform: scale(1.2);
      }
      &.X{
        border: 1px solid $yellow;
        background-color: $yellow-o;
      }
      &.s{
        border: 1px solid $light-green;
        background-color: $light-green-o;
      }
      &.h{
        border: 1px solid $extra-light-purple;
        background-color: $extra-light-purple-o;
      }
    }
  }
</style>
