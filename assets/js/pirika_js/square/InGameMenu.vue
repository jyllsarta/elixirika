<template>
    <div class="area">
        <GeneralButton @click="showMenu" v-if="!showingMenu" :disabled="false" :flashing="false" :width="'160px'" :height="'40px'" :color="'blue'" :label="'メニュー'"></GeneralButton>
        <div class="menu" v-if="showingMenu">
            <div class="_back" @click="closeMenu"></div>
            <div class="items" v-if="showingMenu">
                <GeneralButton @click="closeMenu" :disabled="false" :flashing="false" :width="'160px'" :height="'40px'" :color="'blue'" :label="'とじる'"></GeneralButton>
                <GeneralButton class="message_button" @click="showMessage" :disabled="false" :flashing="false" :width="'160px'" :height="'40px'" :color="'blue'" :label="'おたより'"></GeneralButton>
                <GeneralButton @click="showPlayGuide" :disabled="false" :flashing="false" :width="'160px'" :height="'40px'" :color="'blue'" :label="'あそびかた'"></GeneralButton>
                <GeneralButton @click="showKeyboardHelp()" :disabled="false" :flashing="false" :width="'160px'" :height="'40px'" :color="'blue'" :label="'キーボード操作説明'"></GeneralButton>
                <GeneralButton @click="reset()" :disabled="false" :flashing="false" :width="'160px'" :height="'40px'" :color="'red'" :label="'やりなおす'"></GeneralButton>
                <GeneralButton @click="backToMainMenu()" :disabled="false" :flashing="false" :width="'160px'" :height="'40px'" :color="'red'" :label="'メインメニュー'"></GeneralButton>
            </div>
        </div>
    </div>
</template>

<script>

import GeneralButton from './GeneralButton.vue';
import store from './packs/store';
import Model from './packs/model';

export default ({
  data() {
    return {
      showingMenu: false,
    };
  },
  store,
  components: {
    GeneralButton,
  },
  props: {
    model: Model,
  },
  methods: {
    showMenu() {
      this.$store.commit('playSound', {key: 'menuOpen'});
      this.showingMenu = true;
    },
    closeMenu() {
      this.showingMenu = false;
      this.$store.commit('playSound', {key: 'menuClose'});
    },
    showMessage() {
      this.showingMenu = false;
      this.$store.commit('playSound', {key: 'menuOpen'});
      this.$store.commit('showMessage');
    },
    showPlayGuide() {
      this.showingMenu = false;
      this.$store.commit('showPlayGuide', this.model.characterId);
      this.$store.commit('playSound', {key: 'menuOpen'});
    },
    showKeyboardHelp() {
      this.showingMenu = false;
      this.$store.commit('showKeyboardHelp');
      this.$store.commit('playSound', {key: 'menuOpen'});
    },
    backToMainMenu() {
      this.showingMenu = false;
      this.$emit('guiEvent', {type: 'backToMainMenu'});
    },
    reset() {
      this.showingMenu = false;
      this.$emit('guiEvent', {type: 'reset'});
    },
  },
});
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
