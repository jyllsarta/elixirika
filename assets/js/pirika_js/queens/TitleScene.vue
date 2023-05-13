<template>
  <div class="game_window">
    <div class="logo" @click="loadMenu">
      タイトルだよー
    </div>
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store, 

  methods: {
    loadMenu(){
      this.$store.commit("loadScene", {name: "menu"});
    }
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.game_window{
  width: 100%;
  height: 100%;
  background-color: $bg4;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo{
    border: 1px dotted $white;
    width: 80%;
    height: 80%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
