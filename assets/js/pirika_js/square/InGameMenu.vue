<template lang="pug">
  .area
    GeneralButton(
      @click="showMenu = true"
      v-if="!showMenu"
      :disabled="false"
      :flashing="false"
      :width="'160px'"
      :height="'40px'"
      :color="'blue'"
      :label="'メニュー'"
    )
    .menu(v-if="showMenu")
      ._back(@click="showMenu = false")
      .items(v-if="showMenu")
        GeneralButton(
          @click="showMenu = false"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'blue'"
          :label="'とじる'"
        )
        GeneralButton(
          @click="reset()"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'red'"
          :label="'やりなおす'"
        )
        GeneralButton(
          @click="backToMainMenu()"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'red'"
          :label="'メインメニュー'"
        )
</template>

<script lang="typescript">
  import Vue from 'vue';
  import GeneralButton from "./GeneralButton.vue";

  export default Vue.extend({
    data(){
      return {
        showMenu: false,
      }
    },
    components: {
      GeneralButton
    },
    methods: {
      backToMainMenu(){
        this.showMenu = false;
        this.$emit("guiEvent", {type: "backToMainMenu"});
      },
      reset(){
        this.showMenu = false;
        this.$emit("guiEvent", {type: "reset"});
      },
    }
  })
</script>

<style lang="scss" scoped>
  @import "stylesheets/global_settings";
  .area{
    .menu{
      width: 160px;
      ._back{
        position: absolute;
        // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
        right: calc((#{$window-width} - 100vw + 20px)/2);
        top: -100px;
        width: 100vw;
        height: 100vh;
      }
      .items{
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: $space-m;
      }
    }
  }
</style>
