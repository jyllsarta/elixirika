<template>
  <div class="coin">
    <div class="outer_rhombus" />
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
  props: {
    disabled: Boolean,
    skill: Object,
  },
}
</script>

<style lang="scss" scoped>
@import "./stylesheets/global_settings";
.coin{
  width: 100%;
  height: 100%;
  position: relative;
  //outer_rhombusは縦に長いひし形に変形し、30度傾くようにtransform指定されてる
  .outer_rhombus{
    width: 100%;
    height: 100%;
    position: absolute;
    transform: skewY(-30deg) scale(0.7);
    background-color: rgb(88, 232, 174);
    border: 2px solid rgb(255, 252, 70);
    border-radius: 4px;
  }
  .inner_rhombus{
    width: 100%;
    height: 100%;
    position: absolute;
    transform: skewY(-30deg) scale(0.5);
    background-color: rgb(45, 126, 93);
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
        background-color: rgb(255, 255, 255);
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
        background-color: rgb(255, 255, 255);
      }
    }
  }
}
</style>
