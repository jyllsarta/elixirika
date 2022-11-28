<template>
  <div class="banner" @click="onClick" @mouseenter="onHover">
    <div class="base">
      <img
        class="sheet"
        :style="{
          backgroundImage: `url(/images/square/characters/${character.id}-1.png`,
        }"
      />
      <div class="shadow"></div>
      <div class="names">
        <div class="name">{{ character.name }}</div>
        <div class="next">NEXT: {{ bestChapterIndex }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.window {
  position: absolute;
  width: $window-width;
  height: $window-height;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  .bg {
    position: absolute;
    top: -100px;
    left: calc((100% - 100vw) / 2);
    width: 90vw;
    height: 90vh;
  }
  .body {
    position: absolute;
    height: 100%;
    border-radius: $radius;
  }
}
</style>
