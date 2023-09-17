<template>
  <div class="floating_menu">
    <div class="open button tentative_button" v-if="opening === false" @click="opening = true">
      三
    </div>
    <div class="menu" v-if="opening === true">
      <div class="cancel button tentative_button" @click="opening = false">
        キャンセル
      </div>
      <div class="back_to_menu button tentative_button" @click="loadMenu">
        タイトルに戻る
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store,
  data() {
    return {
      opening: false,
    };
  },
  methods: {
    loadMenu() {
      this.$store.commit("loadScene", { name: "title" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./stylesheets/global_settings";
.floating_menu{
  width: 100%;
  height: 100%;
  .menu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &.open{
    height: 200%;
  }
  .button{
    width: 70px;
    height: 70px;
  }
}
</style>
