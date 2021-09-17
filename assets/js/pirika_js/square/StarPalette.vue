<template lang="pug">
  .area
    .container
      .star(v-for="x in [1,2,3,4,5,6,7,8]")
        | {{x}}
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  .area{
    width: 1200px;
    height: 80px;
    .container{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 10px;
      .star{
        border: 1px solid #99fff6;
        @include centering($height: 50px);
        width: 50px;
      }
    }
  }
</style>
