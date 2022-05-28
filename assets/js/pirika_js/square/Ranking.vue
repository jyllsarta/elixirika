<template lang="pug">
  .ranking
    ._back(@click="closeMenu")
    .content
      .header
        GeneralButton.back_button(
          @click="closeMenu"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'blue'"
          :label="'とじる'"
        )   
        .title
          | ランキング
      .body
        .ranking
          .column.index
            .header
              | 順位
            .row(v-for="index in [1,2,3,4,5]")
              | {{index}}
          .column(v-for="index in [1,2,3,4,5]")
            .header
              | あたま
            .row(v-for="index in [1,2,3,4,5]")
              | {{index}}

</template>

<script lang="typescript">
  import Vue from 'vue';
  import axios from "axios";
  import store from "./packs/store";
  import GeneralButton from "./GeneralButton.vue";

  export default Vue.extend({
    store,
    data(){
      return {
        ranking: []
      }
    },
    components: {
      GeneralButton,
    },
    methods: {
      closeMenu(){
        this.$emit("close");
      },
    },
    computed: {
    },
    mounted(){
        axios.get(`/square/ranking`)
        .then((results) => {
          this.ranking = results.data.ranking;
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })

    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .ranking{
    position: absolute;
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
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
      .header{
        height: 80px;
        display: flex;
        gap: $space-m;
        align-items: center;
        .title{
          line-height: 100%;
          font-size: $font-size-large;
        }
      }
      .body{
        .ranking{
          display: flex;
        }
      }
    }
  }
</style>
