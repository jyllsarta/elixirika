<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      <div class="tentative_panel character">
        キャライラスト
      </div>
      <div class="tentative_panel profile">
        <div class="tentative_panel name">
          キャラ名
        </div>
        <div class="tentative_panel description1">
          プロフィール1
        </div>
        <div class="tentative_panel description2">
          プロフィール2
        </div>
      </div>
      <div class="tentative_panel controls">
        <div class="tentative_panel scenes">
          <div class="tentative_panel scene">
            シーン1
          </div>
          <div class="tentative_panel scene">
            シーン2
          </div>
          <div class="tentative_panel scene">
            シーン3
          </div>
          <div class="tentative_panel scene">
            シーン4
          </div>
        </div>
        <div class="tentative_panel progresses">
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
    }
    .profile{
      width: 35%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      .name{
        height: 100px;
        width: 100%;
      };
      .description1{
        flex: 1;
        width: 100%;
      };
      .description2{
        flex: 1;
        width: 100%;
      };
    }
    .controls{
      width: 35%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      .scenes{
        width: 100%;
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        padding: 8px;
        gap: 8px;
        .scene{
          width: calc(50% - 8px);
          height: calc(50% - 8px);
        }
      }
      .progresses{
        width: 100%;
        height: 15%;
        display: flex;
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
