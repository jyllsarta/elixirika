
<template lang="pug">
  .bullets
    Bullet(
      v-for="bullet in bullets"
      :key="bullet.id"
      :style="bulletStyle(bullet)"
      :type="bullet.type"
    )
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Bullet from "./Bullet.vue";

  export default Vue.extend({
    components: {
      Bullet,
    },
    data(){
      return {
        bullets: [
          {id: 1, x: 800, y: 600, type: "red",
            strokes: [
              {dx: 200, dy: 0},
            ]
          },
          {id: 2, x: 300, y: 200, type: "yellow",
            strokes: [
            ]
          },
          {id: 3, x: 900, y: 150, type: "yellow",
            strokes: [
            ]
          },
          {id: 4, x: 650, y: 150, type: "cyan",
            strokes: [
            ]
          },
          {id: 5, x: 1050, y: 300, type: "cyan",
            strokes: [
            ]
          },
        ]
      }
    },
    methods: {
      bulletStyle(bullet){
        return {
          transform: `translate(${bullet.x}px, ${bullet.y}px)`
        }
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .bullets{
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>