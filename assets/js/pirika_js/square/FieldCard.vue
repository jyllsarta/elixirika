<template lang="pug">
  .card
    | card
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .card{
    box-sizing: border-box; // こいつの危機が怪しい
    width: 100%;
    @include centering($height: 20px);
    border: 1px solid $main-color;
  }
</style>
