<template lang="pug">
  transition(name="show-in")
    .window
      .bg(@click="close")
      .body
        .front
          .title
            .text
              | クロネのあそびかた
          .content
            | そんなものはない
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";

  export default Vue.extend({
    store,
    props: {
    },
    data(){
      return {};
    },
    methods: {
      close(){
        this.$store.commit("closePlayGuide");
        this.$store.commit("playSound", {key: "menuClose"});
      }
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .window {
    position: absolute;
    width: $window-width;
    height: $window-height;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    .bg{
      position: absolute;
      top: -100px;
      left: calc((100% - 100vw) / 2);
      width: 100vw;
      height: calc(100vh + 50px);
    }
    .body{
      position: absolute;
      background-color: $ingame-background;
      border: 2px solid $white;
      width: 700px;
      height: 350px;
      border-radius: $radius;
      .front{
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 $space-m $space-m $space-m;
        display: flex;
        flex-direction: column;
        .title{
          width: 100%;
          border-bottom: 2px solid $white;
          padding-left: $space-m;
          margin-bottom: $space-m;
          display: flex;
          justify-content: left;
          align-items: flex-end;
          gap: $space-ll;
          .text{
            font-size: $font-size-large;
          }
        }
        .content{
          flex-grow: 1;
          width: 100%;
        }
      }
    }
    .show-in-enter-active {
      transition: all .6s;
    }
    .show-in-leave-active {
      transition: all .6s;
    }
    .show-in-enter{
      transform: translateY(10px);
      opacity: 0;
    }
    .show-in-leave-to{
      transform: translateY(-50px) scale(0);
      opacity: 0;
    }
  }
</style>
