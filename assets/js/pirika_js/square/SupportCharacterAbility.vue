<template lang="pug">
  .area
    .abilities_pirika(v-if="character.id === 1")
      .index
        | ピリカのスキル
      .buttons(@click="$emit('guiEvent', {type: 'igniteSupportAbility', vars: 1})")
        | アビ1発動
    .abilities_mizuha(v-if="character.id === 2")
      .index
        | ミズハのスキル(ない)


</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      character: Object,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 200px;
    .abilities_pirika{
      .buttons{
        padding: $space-m;
        border: 1px solid $light-green;
        &:hover{
          transform: scale(1.2);
        }
      }
    }
  }
</style>
