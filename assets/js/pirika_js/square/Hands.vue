<template lang="pug">
  .area
    .hands
      Card(v-for="hand in hands" :key="hand")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./Card.vue"

  export default Vue.extend({
    components: {
      Card
    },
    computed: {
      hands(){
        return ["1s", "2h", "0X", "10d"]
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .area{
    width: 900px;
    height: 200px;
    .hands{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: $space-m;
    }
  }
</style>
