<template lang="pug">
transition(name="show-in")
  .message
    ._back(@click="close")
    .content
      .header
        GeneralButton.back_button(
          @click="close"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'blue'"
          :label="'とじる'"
        )   
        .title
          | ごいけん
      .body
        | {{messages}}
</template>

<script lang="typescript">
  import Vue from 'vue';
  import store from "./packs/store";
  import axios from "axios";
  import GeneralButton from "./GeneralButton.vue";

  export default Vue.extend({
    store,
    components: {
      GeneralButton,
    },
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
  .message{
    border: 2px solid $gray2;
    color: $white;
    ._back{
      position: absolute;
      // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
      right: calc((#{$window-width} - 100vw + 20px)/2);
      top: -100px;
      width: 100vw;
      height: 100vh;
    }
    .content{
      position: absolute;
      background-color: $ingame-background;
      width: 100%;
      height: 100%;
      padding: $space-m;
      .header{
        height: 50px;
        display: flex;
        gap: $space-m;
        align-items: center;
        .title{
          line-height: 100%;
          font-size: $font-size-large;
        }
      }
      .body{
        height: calc(100% - 50px);
        width: 100%;
        display: flex;
        justify-content: center;
        .tabs{

        }
      }
    }
  }
</style>
