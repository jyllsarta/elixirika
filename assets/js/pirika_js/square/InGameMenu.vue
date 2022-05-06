<template lang="pug">
  .area
    GeneralButton(
      @click="showMenu"
      v-if="!showingMenu"
      :disabled="false"
      :flashing="false"
      :width="'160px'"
      :height="'40px'"
      :color="'blue'"
      :label="'メニュー'"
    )
    .menu(v-if="showingMenu")
      ._back(@click="closeMenu")
      .items(v-if="showingMenu")
        GeneralButton(
          @click="closeMenu"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'blue'"
          :label="'とじる'"
        )
        GeneralButton(
          @click="showKeyboardHelp()"
          :disabled="false"
          :flashing="false"
          :width="'160px'"
          :height="'40px'"
          :color="'blue'"
          :label="'キーボード操作説明'"
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
  import store from "./packs/store";

  export default Vue.extend({
    data(){
      return {
        showingMenu: false,
      }
    },
    store,
    components: {
      GeneralButton
    },
    methods: {
      showMenu(){
        this.$store.commit("playSound", {key: "menuOpen"});
        this.showingMenu = true;
      },
      closeMenu(){
        this.showingMenu = false;
        this.$store.commit("playSound", {key: "menuClose"});
      },
      showKeyboardHelp(){
        this.showingMenu = false;
        this.$store.commit("showKeyboardHelp");
        this.$store.commit("playSound", {key: "menuOpen"});
      },
      backToMainMenu(){
        this.showingMenu = false;
        this.$emit("guiEvent", {type: "backToMainMenu"});
      },
      reset(){
        this.showingMenu = false;
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
