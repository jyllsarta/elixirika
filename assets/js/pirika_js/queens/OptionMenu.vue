<template>
  <div class="menu">
    <div class="ai"></div>
    <div class="ai"></div>
    <div class="ai"></div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.menu{
  border: 1px solid $white;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  .ai{
    width: 30px;
    height: 1px;
    background-color: $white;
  }
}
</style>
