<template lang="pug">
  .game
    | あらたなインゲームのシーンなの

</template>

<script lang="typescript">
    import Vue from 'vue';

    export default Vue.extend({
    components: {
    },
    props: {
    },
    mounted(){
    },
    methods: {
      endGame(){
        this.$emit("endGame");
      }
    },
    data(){
      return {
      };
    },
    computed: {
      model(){
      },
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  .game{
    width: 1024px;
    height: 600px;
    background-color: azure;
  }
</style>
