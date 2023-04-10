<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      <div class="main_image">
        <img class="image" src="images/queens/tutorial1.png" alt="">
      </div>
      <div class="skit_area">
        <div class="left_character">
          <img src="images/queens/characters/face-ikari1.png" alt="" class="character">
        </div>
        <div class="skit">
          <div class="covers">
            <div class="upper"/>
            <div class="downer"/>
          </div>
          <div class="says">
            <div class="say">~チュートリアル~</div>
            <div class="say">チュートリアルということで、クイーンズの解説をしていくわ</div>
            <div class="say">だいたいギャンブル漫画のオリジナルカードゲームって感じよ</div>
            <div class="say">5枚から2枚出して目標値に近いほうが勝ちってわけ</div>
          </div>
        </div>
        <div class="right_character">
          <img src="images/queens/characters/face-queens1.png" alt="" class="character">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeMenu() {
      this.$emit("close");
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
    height: 100vh;
  }

  .content{
    position: absolute;
    top: 10%;
    left: 20%;
    height: 80%;
    width: 60%;
    background-color: rgb(38, 40, 42);
    border: 1px solid rgb(255, 254, 254);
    .main_image{
      padding-top: 10px;
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      .image{
        width: 80%;
      }
    }
    .skit_area{
      display: flex;
      height: 40%;
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
          .upper{
            width: 100%;
            height: 40px;
            background: linear-gradient(to bottom, black 20%, transparent 100%);
          }
          .downer{
            width: 100%;
            height: 40px;
            background: linear-gradient(to top, black 20%, transparent 100%);
          }
        }
        .says{
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
          gap: 10px;
          height: 100%;
          padding: 30px 10px 10px 10px;
          &::-webkit-scrollbar {
            width: 10px;
          }
          &::-webkit-scrollbar-track {
            background: transparent;
            border: none;
            border-radius: 4px;
            box-shadow: inset 0 0 2px #292828;
          }
          &::-webkit-scrollbar-thumb {
            background: rgb(47, 47, 48);
            border-radius: 4px;
            box-shadow: none;
          }
          .say{
            border: 1px solid white;
            padding: 10px;
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
