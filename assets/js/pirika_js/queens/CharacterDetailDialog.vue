<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      <div class="character">
        <img src="images/queens/characters/character1_1.png" class="character_image">
      </div>
      <div class="profile">
        <div class="name">
          トローズ
        </div>
        <div class="description1">
          クイーンズで最近目立って勝ち越している少女。かなり直感で動くタイプで、顔に考えていることが出やすい。<br>
          [ひみつ1] 出しているカードがピッタリの場合、1以上足りない場合、少しでもバーストしている場合、それぞれで異なる表情となる。<br>
          [ひみつ2] 今のラウンドに対し、最も勝率の高いカードを選ぶ。どんなに調子が良くとも、7ラウンド目には必ずバーストする。<br>
        </div>
        <div class="description2">
          [フィールドエフェクト] 等価交換<br>
          1ターンに一度、手札を1枚捨てて1枚引くことができる。捨てた手札が5以上の場合、MP+1。<br>
        </div>
      </div>
      <div class="controls">
        <div class="header">
          記録
        </div>
        <div class="scenes">
          <img src="images/queens/scenes/scene1_1.png" class="scene">
          <img src="images/queens/scenes/scene1_1.png" class="scene">
          <img src="images/queens/scenes/scene1_1.png" class="scene">
          <img src="images/queens/scenes/scene1_1.png" class="scene">
        </div>
        <div class="header">
          チャプター
        </div>
        <div class="progresses">
          <div class="tentative_panel progress">
            1
          </div>
          <div class="tentative_panel progress">
            2
          </div>
          <div class="tentative_panel progress">
            3
          </div>
          <div class="tentative_panel progress">
            4
          </div>
        </div>
        <div class="tentative_button start" @click="loadScene('in_game')">
          START
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./packs/store";

export default {
  store, 
  methods: {
    closeMenu(){
      this.$emit("close");
    },
    loadScene(name){
      this.$store.commit("loadScene", {name: name});
    }
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.dialog{
  position: absolute;
  width: 100%;
  height: 100%;
  ._back {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  .content{
    position: absolute;
    top: 10%;
    left: 10%;
    height: 80%;
    width: 80%;
    background-color: $bg3;
    border: 2px solid $base2;
    padding: 8px;
    display: flex;
    justify-content: space-around;
    .character{
      width: 25%;
      height: 100%;
      overflow: hidden;
      .character_image{
        height: 180%;
        transform: translateX(calc(50px - 22vh));
      }
    }
    .profile{
      width: 35%;
      display: flex;
      flex-direction: column;
      padding: 8px;
      background-color: $bg3;
      .name{
        height: 100px;
        width: 100%;
        display: flex;  
        justify-content: center;
        align-items: center;
        font-size: $font-size-xlarge;
        border-bottom: 1px dotted $white;
      };
      .description1{
        flex: 1;
        width: 100%;
        padding: 4px;
        border-bottom: 1px dotted $white;
      };
      .description2{
        flex: 1;
        width: 100%;
        padding: 4px;
      };
    }
    .controls{
      width: 35%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      .header{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px dotted $white;
        padding: 4px;
      }
      .scenes{
        width: 100%;
        height: 45%;
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        gap: 8px;
        .scene{
          width: calc(50% - 4px);
          object-fit: cover;
          filter: blur(3px);
        }
      }
      .progresses{
        width: 100%;
        height: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        gap: 8px;
        .progress{
          width: 70px;
          height: 70px;
        }
      }
      .start{
        flex: 1;
        width: 100%;
      }
    }
  }
}
</style>
