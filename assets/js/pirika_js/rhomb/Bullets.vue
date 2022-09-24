
<template lang="pug">
  .field
    canvas.lines(ref="canvas" width="1200" height="800")
    .bullets
      .bullet
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
              {dx: 0, dy: -80},
              {dx: 80, dy: 0},
              {dx: 0, dy: 160},
              {dx: -220, dy: 0},
            ]
          },
          {id: 2, x: 300, y: 200, type: "yellow",
            strokes: [
              {dx: -200, dy: 200},
            ]
          },
          {id: 3, x: 900, y: 150, type: "yellow",
            strokes: [
              {dx: -500, dy: 400},
            ]
          },
          {id: 4, x: 650, y: 100, type: "cyan",
            strokes: [
              {dx: 0, dy: 200},
              {dx: -300, dy: 0},
              {dx: 0, dy: 200},
            ]
          },
          {id: 5, x: 1050, y: 300, type: "cyan",
            strokes: [
              {dx: 0, dy: 200},
              {dx: -300, dy: 0},
              {dx: 0, dy: 200},
              {dx: -150, dy: 0},
            ]
          },
        ]
      }
    },
    mounted(){
      this.drawLines();
    },
    methods: {
      bulletStyle(bullet){
        return {
          transform: `translate(${bullet.x}px, ${bullet.y}px)`
        }
      },
      drawLines(){
        const canvas = this.$refs.canvas;
        const context = canvas?.getContext("2d");
        context.translate(.5,.5);
        context.setLineDash([30, 15]);

        for(let bullet of this.bullets){
          // TODO(jyllsarta): type === color は偶然の一致なのでマスタ管理にする
          context.strokeStyle = bullet.type;
          context.beginPath();
          let x = bullet.x;
          let y = bullet.y;
          context.moveTo(x, y);
          for(let stroke of bullet.strokes){
            x += stroke.dx;
            y += stroke.dy;
            context.lineTo(x, y);
          }
          context.stroke();
        }
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .lines{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .bullets{
    position: absolute;
    width: 100%;
    height: 100%;
    .bullet{
      position: absolute;
      transform: translate(-15px, -15px);
    }
  }
</style>