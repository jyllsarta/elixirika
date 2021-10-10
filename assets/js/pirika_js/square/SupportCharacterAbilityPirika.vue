<template lang="pug">
  .area
    .index
      | ピリカのスキル
    .buttons(@click="$emit('guiEvent', {type: 'igniteSupportAbility', vars: 1})")
      | アビ1発動

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
    .buttons{
      padding: $space-m;
      border: 1px solid $light-green;
      &:hover{
        transform: scale(1.2);
      }
    }
  }
</style>
