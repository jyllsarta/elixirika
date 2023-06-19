<template>
  <div class="dialog" v-if="says.length > 0">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      <div class="main_image">
        <img class="image" :src="`images/queens/scenes/scene${sceneId}_${currentSay.main_image_id}.png`">
      </div>
      <div class="skit_area">
        <div class="left_character">
          <img :src="`images/queens/characters/face-queens${currentSay.face_id}.png`" class="character">
        </div>
        <div class="skit">
          <div class="covers">
            <div class="upper"/>
            <div class="downer"/>
          </div>
          <div class="says" ref="says" @scroll="updateFace">
            <div :class="['say', say.side]" v-for="say in says" :key="say.id" @mousedown="nextSay(say.order)">{{say.text}}</div>
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
  ._back {
    position: absolute;
    right: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
  .content{
    position: absolute;
    height: 100%;
    width: 94%;
    left: 3%;
    background-color: $bg3;
    .main_image{
      position: absolute;
      overflow: hidden;
      top: calc(280px - 24vw);
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .image{
        width: 100%;
      }
    }
    .skit_area{
      position: absolute;
      display: flex;
      width: 100%;
      height: 20%;
      bottom: 0;
      background-color: $bg3;
      opacity: 0.9;
      .left_character{
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;        
        .character{
          width: 128px;
          height: 128px;
          transform: scale(-1,1);
        }
      }
      .skit{
        height: 100%;
        position: relative;
        .covers{
          position: absolute;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          .downer{
            width: 100%;
            height: 40px;
            background: linear-gradient(to top, $bg3 20%, transparent 100%);
          }
        }
        .says{
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
          gap: 30px;
          height: 100%;
          padding: 10px 10px 60px 10px;
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
          .say{
            border: 1px solid $gray2;
            padding: 10px;
            min-height: 90px;
          }
          .center{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 25px;
            margin-left: 25px;
            background-color: $bg2;
            opacity: 0.8;
          }
          .left{
            margin-right: 50px;
            background-color: $bg3;
            opacity: 0.8;
          }
          .right{
            margin-left: 50px;
            background-color: $bg3;
            opacity: 0.8;
          }
        }
      }
      .right_character{
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;        
        .character{
          width: 128px;
          height: 128px;
        }
      }
    }
  }
}
</style>
