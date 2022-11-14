<template lang="pug">
  .challenge(:class="isCleared ? 'cleared' : 'not_cleared'")
    .icon(v-if="isCleared && showIndex")
      | ◆
    .icon(v-if="!isCleared && showIndex")
      | ◇
    .rank(v-if="showIndex")
      | {{["I","II","III","IV"][index]}}
    .description
      | {{showDescription ? challenge.description : challenge.title}}
        
</template>

<script lang="javascript">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      challenge: Object,
      isCleared: Boolean,
      index: Number,
      showDescription: Boolean,
      showIndex: Boolean,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .challenge{
    display: flex;
    gap: $space-m;
    .icon{
      width: 16px;
    }
    .rank{
      width: 24px;
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
