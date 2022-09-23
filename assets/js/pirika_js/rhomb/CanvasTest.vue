
<template lang="pug">
  .field
    .title
      | CANVAS TEST
    canvas.canvas(ref="canvas", width="640" height="480")
</template>

<script lang="typescript">
  import Vue from 'vue';

  export default Vue.extend({
    mounted(){
      this.onLoad();
    },
    methods: {
      onLoad(){
        this.draw();
      },
      draw(){
        const canvas = this.$refs.canvas;
        const context = canvas?.getContext("2d");
        context.translate(.5,.5);

        context.strokeStyle='cyan';
        context.strokeRect(100, 50, 120, 60);

        context.beginPath();
        context.setLineDash([10,5]);
        context.moveTo(100, 100);
        context.lineTo(250, 200); 
        context.lineTo(350, 200); 
        context.lineTo(250, 100); 
        context.stroke();

        context.shadowColor='white';
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;        

        context.beginPath();
        context.moveTo(200, 200);
        context.lineTo(400, 400);
        context.lineTo(200, 400);
        context.lineTo(400, 200);
        const grad = context.createLinearGradient(0,0,500,0);
        grad.addColorStop(0, 'cyan');
        grad.addColorStop(1, 'red');
        context.strokeStyle = grad;
        context.lineWidth = 1;
        context.stroke();
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .field{
    .title{
      line-height: 100%;
      font-size: 8px;
      width: 100%;
      text-align: center;
      color: cyan;
    }
    .canvas{
      position: relative;
      width: 640px;
      height: 480px;
    }
  }
</style>
