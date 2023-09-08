<template>
  <div class="dialog" v-if="says.length > 0">
    <div class="back" @click="closeMenu">←</div>
    <div class="content">
      <div class="main_image" @click="next()">
        <img class="image" :src="`images/queens/scenes/scene${sceneId}_${currentSay?.main_image_id}.png`">
      </div>
      <div class="bottom_area" :style="{visibility: showText ? 'visible' : 'hidden'}">
        <div class="upper_graduation" />
        <div class="skit_area">
          <div class="background" />
          <div class="close" @click="closeText">×</div>
          <div class="skit">
            <div class="says" ref="says" @scroll="updateFace">
              <div :class="['say', say.side]" v-for="say in says" :key="say.id" @mousedown="nextSay(say.order)">
                <div class="bg" />
                <div class="text">{{say.text}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masterdata from "./packs/masterdata";

export default {
  props:{
    sceneId: Number,
  },
  data(){
    return {
      currentSay: null,
      says: [],
      showText: true,
    };
  },
  mounted(){
    this.says = masterdata.getAll("scripts").filter(s => s.scene_id === this.sceneId);
    this.currentSay = this.says[0];
  },
  methods: {
    closeMenu() {
      this.$emit("close");
    },
    updateFace(){
      // 要素140px + gap30px
      const scroll = Math.max(this.$refs.says.scrollTop + 40, 0);
      const index = Math.floor(scroll / 170);
      this.currentSay = this.says[index] || this.currentSay;
    },
    nextSay(id){
      if(id >= this.says.length){
        return;
      }
      this.currentSay = this.says.find(say => say.order == this.currentSay.order + 1) || this.currentSay;
      this.$refs.says.scrollTop = 170 * id;
    },
    next(){
      if(!this.showText){
        this.showText = true;
        return;
      }
      if(!this.currentSay){
        return;
      }
      this.nextSay(this.currentSay.order);
    },
    closeText(){
      console.log("close");
      this.showText = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.dialog{
  .back {
    position: absolute;
    left: 8px;
    top: 8px;
    width: 60px;
    height: 60px;
    border: 1px solid $white;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.7;
  }
  .content{
    height: 100%;
    width: 100%;
    background-color: $bg3;
    .main_image{
      position: absolute;
      height: 100%;
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .image{
        position: absolute;
        height: 100%;
        object-fit: cover;
      }
    }
    .bottom_area{
      position: absolute;
      width: 100%;
      height: 200px;
      bottom: 0;
      .upper_graduation{
        position: absolute;
        width: 100%;
        height: 20px;
        background: linear-gradient(to bottom, transparent, $bg3);
        opacity: 0.3;
      }
      .skit_area{
        position: absolute;
        width: 100%;
        height: 180px;
        bottom: 0;
        .background{
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: $bg3;
          opacity: 0.3;
        }
        .close{
          position: absolute;
          width: 50px;
          height: 50px;
          border: 1px solid $white;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 8px;
          top: 8px;
          z-index: 100;
        }
        .skit{
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          .says{
            display: flex;
            flex-direction: column;
            overflow-y: scroll;
            gap: 30px;
            height: 100%;
            width: 100%;
            max-width: 1000px;
            padding: 6px 6px 60px 6px;
            .say{
              border: 1px solid $gray2;
              min-height: 140px;
              width: 100%;
              position: relative;
              .bg{
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: $bg3;
                opacity: 0.4;
              }
              .text{
                position: absolute;
                width: 100%;
                height: 100%;
                padding: 8px 30px 8px 30px;
                font-size: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            &::-webkit-scrollbar {
              width: 10px;
            }
            &::-webkit-scrollbar-track {
              background: transparent;
              border: none;
              border-radius: 4px;
              box-shadow: inset 0 0 2px $gray3;
            }
            &::-webkit-scrollbar-thumb {
              background: $base2;
              border-radius: 4px;
              box-shadow: none;
            }
          }
        }
      }
    }
  }
}
</style>
