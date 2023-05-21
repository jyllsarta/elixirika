<template>
  <div class="wrapper">
    <img src="images/queens/characters/queens1.png" class="character_image">
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .character_image{
    height: 100%;
  }
}
</style>
