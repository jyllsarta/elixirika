<template lang="pug">
transition(name="show-in")
  .window
    .bg(@click="close")
    .body
      | {{messages}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";
  import axios from "axios";

  export default Vue.extend({
    store,
    data(){
      return {
        messages: []
      };
    },
    created(){
      this.fetch();
    },
    methods: {
      close(){
        this.$store.commit("closeMessage");
        this.$store.commit("playSound", {key: "menuClose"});
      },
      fetch(){
        axios.get(`/square/messages`)
        .then((results) => {
          this.messages = results.data;
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
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
      width: 100vw;
      height: calc(100vh + 50px);
    }
    .body{
      position: absolute;
      background-color: $ingame-background;
      border: 2px solid $white;
      width: 700px;
      height: 470px;
      border-radius: $radius;
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
