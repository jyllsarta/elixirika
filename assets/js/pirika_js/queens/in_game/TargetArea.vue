<template>
  <div class="target_area">
    <div class="description">
      目標値: この値に近いほうが勝ち
    </div>
    <div class="target">
      <div class="label">
        Target:
      </div>
      <div class="value">
        16
      </div>
    </div>
    <div class="next">
      <div class="label">
        next:
      </div>
      <div class="value">
        7
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
.target_area{
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .description{
    width: 100%;
    font-size: $font-size-mini;
  }
  .target{
    width: 100%;
    height: 40%;
    border: 1px dotted $white;
    display: flex;
    flex-direction: column;
    padding: 4px;
    line-height: 100%;
    .value{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-xlarge;
      line-height: 100%;
    }
  }
  .next{
    width: 100%;
    height: 15%;
    border: 1px dotted $white;
    display: flex;
    padding: 4px;
  }
}
</style>
