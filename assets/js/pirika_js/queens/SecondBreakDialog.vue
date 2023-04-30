<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      <div class="main_image">
        <img class="image" :src="`images/queens/trim_scene2_${currentSay.main_image_id}.png`" alt="">
      </div>
      <div class="skit_area">
        <div class="left_character">
          <img :src="`images/queens/characters/face-ikari${currentSay.face_id}.png`" alt="" class="character">
        </div>
        <div class="skit">
          <div class="covers">
            <div class="upper"/>
            <div class="downer"/>
          </div>
          <div class="says" ref="says" @scroll="updateFace">
            <div :class="['say', say.side]" v-for="say in says" :key="say.id" @mousedown="nextSay(say.id)">{{say.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    const says = [
      {"id": 1, "side": "center", "character_id": 1, "face_id": 1, "main_image_id": 1, "text": "～SecondBreak~"},
      {"id": 2, "side": "center", "character_id": 1, "face_id": 1, "main_image_id": 2, "text": "よくやったわね、あんたの勝ちよ。そこの負け犬は好きにしちゃってちょうだい"},
      {"id": 3, "side": "center", "character_id": 1, "face_id": 1, "main_image_id": 3, "text": "3"},
      {"id": 4, "side": "center", "character_id": 1, "face_id": 1, "main_image_id": 4, "text": "4"},
      {"id": 5, "side": "center", "character_id": 1, "face_id": 1, "main_image_id": 5, "text": "5"},
      {"id": 6, "side": "center", "character_id": 1, "face_id": 1, "main_image_id": 6, "text": "6"},
 ];
    return {
      currentSay: says[0],
      says: says,
    };
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
      console.log(this.says[id].text)
      this.currentSay = this.says[id];
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
    // 画面横幅のなにもない領域 - 20px まで当たり判定を持つ
    right: calc((1200px - 100vw + 20px) / 2);
    top: 0;
    width: 100vw;
    height: 90vh;
  }

  .content{
    position: absolute;
    top: 2%;
    left: 15%;
    height: 96%;
    width: 70%;
    background-color: $bg3;
    border: 2px solid $base2;
    .main_image{
      position: absolute;
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
      height: 35%;
      bottom: 0;
      background-color: $bg3;
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
          padding: 60px 10px 60px 10px;
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
