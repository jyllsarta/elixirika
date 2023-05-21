<template>
  <div class="decide_area">
    <div class="ok tentative_button disabled">
      OK
    </div>
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
.decide_area{
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .ok{
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
