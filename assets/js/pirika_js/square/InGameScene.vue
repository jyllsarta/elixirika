<template lang="pug">
  .game
    p
      | あらたなインゲームのシーンなの
    SupportCharacter

</template>

<script lang="typescript">
    import Vue from 'vue';
    import SupportCharacter from "./SupportCharacter.vue"

    export default Vue.extend({
    components: {
      SupportCharacter
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
