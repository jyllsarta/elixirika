<template lang="pug">
  .challenge(:class="isCleared ? 'cleared' : 'not_cleared'")
    .icon(v-if="isCleared")
      | ◆
    .icon(v-else="isCleared")
      | ◇
    .rank
      | {{["I","II","III","IV"][index]}}
    .description
      | {{challenge.title}}
        
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      challenge: Object,
      isCleared: Boolean,
      index: Number,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .challenge{
    display: flex;
    gap: $space-m;
    .icon{
      width: 20px;
    }
    .rank{
      width: 30px;
      text-align: center;
    }
    &.cleared{
      color: $purple1;
    }
    &.not_cleared{
      opacity: $disabled-opacity;
    }
  }
</style>
