
<template lang="pug">
  .commands
    .title
      | ENEMY ACTION
    .turns
      .bullets
        Bullet(type="yellow")
        Bullet(type="yellow")
        Bullet(type="cyan")
        Bullet(type="cyan")
        Bullet(type="red")
      .bullets
        Bullet(type="red")
        Bullet(type="red")
      .bullets
        Bullet(type="cyan")
        Bullet(type="cyan")
        Bullet(type="cyan")
        Bullet(type="cyan")
        Bullet(type="cyan")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Bullet from "./Bullet.vue";

  export default Vue.extend({
    components: {
      Bullet,
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .commands{
    .title{
      line-height: 100%;
      font-size: 8px;
      width: 100%;
      text-align: center;
      color: cyan;
    }

    .turns{
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      .bullets{
        display: flex;
        gap: 8px;
        padding: 4px 8px 4px 8px;
        border-radius: 40px;
        &:first-child{
          border: 1px solid rgb(136, 71, 71);
        }
      }
    }
  }
</style>
