<template>
  <div class="skill">
    <div class="label">
      スキル
    </div>
    <div class="value">
      {{index}}
    </div>
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store,
  props: {
    index: Number,
  },
};
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.skill{
  width: 150px;
  height: 100px;
  border: 1px dotted $white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  line-height: 100%;
  .label{
    font-size: $font-size-mini;
  }
  .value{
    font-size: $font-size-large;
  }
}
</style>
