<template>
  <div class="cards">
    <div class="card tentative_panel">?</div>
    <div class="card tentative_panel">?</div>
    <div class="card tentative_panel">?</div>
    <div class="card tentative_panel">?</div>
    <div class="card tentative_panel">?</div>
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
.cards{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  .card{
    width: 60px;
    height: 60px;
  }
}
</style>
