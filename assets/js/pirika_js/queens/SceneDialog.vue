<template>
  <div class="dialog" v-if="says.length > 0">
    <div class="back" @click="closeMenu">←</div>
    <div class="content">
      <div class="main_image">
        <img class="image" :src="`images/queens/scenes/scene${sceneId}_${currentSay.main_image_id}.png`">
      </div>
      <div class="bottom_area">
        <div class="upper_graduation" />
        <div class="skit_area">
          <div class="background" />
          <div class="skit">
            <div class="says" ref="says" @scroll="updateFace">
              <div :class="['say', say.side]" v-for="say in says" :key="say.id" @mousedown="nextSay(say.order)">{{say.text}}</div>
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
      // 要素90px + gap30px
      const scroll = Math.max(this.$refs.says.scrollTop + 40, 0);
      const index = Math.floor(scroll / 120);
      console.log(index);
      this.currentSay = this.says[index];
    },
    nextSay(id){
      if(id >= this.says.length){
        console.log("this is last");
        return;
      }
      this.currentSay = this.says.find(say => say.order == id + 1);
      this.$refs.says.scrollTop = 120 * id;
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
      height: 90%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .image{
        width: 100%;
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
        opacity: 0.7;
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
          opacity: 0.7;
        }
        .skit{
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
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
              padding: 8px 40px 8px 40px;
              min-height: 90px;
              width: 100%;
              font-size: 18px;
              &.center{
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: $bg2;
              }
              &.left{
                background-color: $bg3;
              }
              &.right{
                background-color: $bg3;
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
