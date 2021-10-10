<template lang="pug">
  .area
    .index
      | ミズハにスキルはない

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
  }
</style>
