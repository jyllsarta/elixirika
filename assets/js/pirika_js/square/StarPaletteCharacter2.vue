<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette2.svg")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"
  import NumeratableNumber from "./NumeratableNumber.vue";

  export default Vue.extend({
    props: {
      model: Model,
    },
    components: {
      NumeratableNumber,
    },
    data(){
      return { 
      }
    },
    mounted(){
    },
    methods: {
    },
    computed: {
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .star_palette{
    position: absolute;
    width: 100%;
    height: 100%;
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
      }
    }
  }
</style>
