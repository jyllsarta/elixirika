
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
  import Model from "./packs/model";

  export default Vue.extend({
    components: {
      Bullet,
    },
    props: {
      model: Model,
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
        context.clearRect(0, 0, 1200, 800);
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
    },
    computed: {
      bullets(){
        return this.model.bullets || [];
      }
    },
    watch: {
      "model.turn": function(){
        this.drawLines();
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