<template>
  <div class="game_window">
    <div class="logo" @click="loadInGame">
      メニューだよー
    </div>
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store, 
  methods: {
    loadInGame(){
      this.$store.commit("loadScene", {name: "in_game"});
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
