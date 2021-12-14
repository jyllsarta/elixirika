<template lang="pug">
  .area
    .show_menu.with_shadow(v-if="!showMenu" @click="showMenu = true")
      | メニュー
    .menu(v-if="showMenu")
      ._back(@click="showMenu = false")
      .items
        .item.with_shadow(@click="showMenu = false")
          | とじる
        .item.with_shadow.danger(@click="reset()")
          | やりなおす
        .item.with_shadow.danger(@click="backToMainMenu()")
          | メインメニュー
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    data(){
      return {
        showMenu: false,
      }
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
    .show_menu{
      @include centeringWithBorder($height:40px, $border: 2px);
      width: 160px;
      background-color: $blue3;
      border: 2px solid $blue1;
      border-radius: $radius;
    }
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
        .item{
          width: 100%;
          @include centeringWithBorder($height:40px, $border: 2px);
          background-color: $blue3;
          border: 2px solid $blue1;
          border-radius: $radius;
          &.danger{
            background-color: $red3;
            border: 2px solid $red1;
          }
        }
      }
    }
  }
</style>
