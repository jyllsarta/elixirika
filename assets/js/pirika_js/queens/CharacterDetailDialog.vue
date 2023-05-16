<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      <div class="tentative_button button" @click="loadScene('in_game')">
        キャラ詳細だよー(クリックでインゲームへ)
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store, 
  methods: {
    closeMenu(){
      this.$emit("close");
    },
    loadScene(){
      this.$store.commit("loadScene", {name: "in_game"});
    }
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.dialog{
  ._back {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  .content{
    position: absolute;
    top: 10%;
    left: 10%;
    height: 80%;
    width: 80%;
    background-color: $bg3;
    border: 2px solid $base2;
    .button{
      width: 50%;
      height: 50%;
    }
  }
}
</style>
