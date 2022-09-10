
<template lang="pug">
  .sight(:style="{transform: `translate(${model.sight.x - 20}px, ${model.sight.y - 20}px) rotate(45deg)`}")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Controller from "./packs/controller";
  import Model from "./packs/model";

  export default Vue.extend({
    props: {
      model: Model,
      controller: Controller,
      screen: Object,
    },
    data(){
      return {
        listener: null,        
      }
    },
    methods: {
      watchMove(e){
        if(e.srcElement.id !== "screen"){
          return;
        }
        this.model.sight.updatePosition(e.offsetX, e.offsetY);
        // 将来的にはGUIHandlerに移譲したい
        this.controller.tryLock();
      },
      watchMouseDown(e){
        // 将来的にはGUIHandlerに移譲したい
        this.controller.startLocking();
      },
      watchMouseUp(e){
        // 将来的にはGUIHandlerに移譲したい
        this.controller.endLocking();
      },
      registerWatch(){
        this.screen.screen.addEventListener("mousemove", (e)=>{
          this.watchMove(e);
        });
        this.screen.screen.addEventListener("mousedown", (e)=>{
          this.watchMouseDown(e);
        });
        this.screen.screen.addEventListener("mouseup", (e)=>{
          this.watchMouseUp(e);
        });
      }
    },
    mounted(){
      // inputtingをオンにしても次のフレームまで待たないとまだ入力欄は作られない
      Vue.nextTick( ()=> {
        this.registerWatch();
      });
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .sight{
    width: 40px;
    height: 40px;
    background-color: rgb(106, 115, 98);
    pointer-events: none;
    opacity: 0.6;
    border: 1px solid #a9ffd8;
  }
</style>
