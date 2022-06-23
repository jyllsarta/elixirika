<template lang="pug">
transition(name="show-in")
  ._message
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
      .description
        | 簡単なメッセージを送れます。バグ報告や仕様質問などにご活用ください！感想いただけると大喜びします
      .body
        .messages
          .__message.index
            .created_at.column
              | 日付
            .text.column
              | 内容
            .response.column
              | 返信
          .__message(v-for="message in messages")
            .created_at.column
              | {{message.created_at}}
            .text.column
              | {{message.message}}
            .response.column
              | {{message.response}}
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
  ._message{
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
      .description{
        border-bottom: 1px solid $gray3;
        font-size: $font-size-mini;
      }
      .body{
        height: calc(100% - 50px);
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: $space-m;
        .messages{
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          gap: $space-m;
          padding-right: $space-m;
          &::-webkit-scrollbar{
            width: 10px;
          }
          &::-webkit-scrollbar-track{
            background: transparent;
            border: none;
            border-radius: $radius;
            box-shadow: inset 0 0 2px #777;
          }
          &::-webkit-scrollbar-thumb{
            background: $gray2;
            border-radius: $radius;
            box-shadow: none;
          }

          .__message{
            display: flex;
            gap: $space-m;
            &.index{
              border-bottom: 1px solid $gray3;
              padding-bottom: $space-m;
            }
            .column{
              border-left: 1px solid $gray3;
              padding-left: $space-m;
            }
            .created_at{
              width: 20%;
            }
            .text{
              width: 30%;
              white-space: pre-wrap;
            }
            .response{
              flex: 1;
              white-space: pre-wrap;
            }
          }
        }
      }
    }
  }
</style>
