<template>
  <div class="coin">
    <div class="border">
      <div class="outer_rhombus" />
    </div>
    <div class="inner_rhombus" />
    <div class="cross">
      <div class="line1">
        <div class="line"/>
      </div>
      <div class="line2">
        <div class="line"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store,
};
</script>

<style lang="scss" scoped>
@import "./stylesheets/global_settings";
.coin{
  width: 100%;
  height: 100%;
  position: relative;
  .border{
    width: 100%;
    height: 100%;
    position: absolute;
    border: 2px solid rgb(253, 255, 187);
    transform: skewY(-30deg) scale(0.75);
    .outer_rhombus{
      width: 100%;
      height: 100%;
      background-color: rgb(0, 200, 159);
      border: 2px solid rgb(0, 0, 0);
    }
  }
  .inner_rhombus{
    width: 100%;
    height: 100%;
    position: absolute;
    transform: skewY(-30deg) scale(0.5);
    background-color: rgb(0, 101, 87);
  }
  .cross{
    width: 100%;
    height: 100%;
    position: absolute;
    transform: skewY(-30deg) scale(0.9);
    .line1{
      width: 100%;
      height: 100%;
      position: absolute;
      transform: rotate(45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      .line{
        width: 100%;
        height: 1px;
        background-color: rgb(0, 0, 0);
      }
    }
    .line2{
      width: 100%;
      height: 100%;
      position: absolute;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      .line{
        width: 100%;
        height: 2px;
        background-color: rgb(0, 0, 0);
      }
    }
  }
}
</style>
