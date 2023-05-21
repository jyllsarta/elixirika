<template>
  <div class="card_area">
    <div class="card_panel">
      <div class="cards">
        <div class="card">?</div>
        <div class="card">?</div>
      </div>
      <div class="value">
        ?
      </div>
    </div>
    <div class="card_panel">
      <div class="cards">
        <div class="card">7</div>
        <div class="card">8</div>
      </div>
      <div class="value">
        15
      </div>
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
.card_area{
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5%;
  .card_panel{
    width: 100%;
    height: 40%;
    min-height: 90px;
    border: 1px dotted $white;
    display: flex;
    padding: 8px;
    .cards{
      height: 100%;
      width: 70%;
      border-right: 1px dotted $white;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .card{
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dotted $white;
      }
    }
    .value{
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-xlarge;
    }
  }
}
</style>
