<template lang="pug">
  transition(name="show-in")
    .window
      .bg(@click="close")
      // TODO: clearImageIdで制御する
      img.body(src="/images/square/descriptions/description1.png")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";

  export default Vue.extend({
    store,
    data(){
      return {};
    },
    methods: {
      close(){
        this.$emit("close");
        this.$store.commit("playSound", {key: "menuClose"});
      }
    },
    computed: {
    }
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
      width: 90vw;
      height: 90vh;
    }
    .body{
      position: absolute;
      width: 900px;
      border-radius: $radius;

    }
  }
</style>
