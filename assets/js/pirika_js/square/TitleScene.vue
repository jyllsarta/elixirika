
<template lang="pug">
  .scene
    .title(@click="onClick")
      .tops
        .logo
          .container
            .box
              .letter
                | す
            .box
              .letter
                | く
            .box
              .letter
                | え
            .box
              .letter
                | あ
        .start
          | クリックしてはじめる
      .bottoms
        .name_area(@click.stop)
          NameArea
        p
          | 今のすくえあは完全に隠しページで動作確認中フェーズなので、いっさいの説明はありません。マウスでもキーボードでも遊べますが、自己責任かつご自由におたのしみください！
      transition(
        name="shutter"
        @enter="onAnimationEnter"
        @after-enter="onAnimationComplete"
      )
        .shutters(v-if="closing")
          .horizontal
            .shutter1(ref="shutter1")
            .shutter2(ref="shutter2")
          .vertical
            .shutter3(ref="shutter3")
            .shutter4(ref="shutter4")
    GeneralButton.credit_button(
      @click="showCredit()"
      :disabled="false"
      :flashing="false"
      :width="'120px'"
      :height="'50px'"
      :color="'blue'"
      :label="'クレジット'"
    )
    Credit.credit(v-if="showsCredit" @close="closeCredit")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import NameArea from "./NameArea.vue";
  import gsap from 'gsap';
  import store from "./packs/store";
  import GeneralButton from "./GeneralButton.vue";
  import Credit from "./Credit.vue";

  export default Vue.extend({
    components: {
      NameArea,
      GeneralButton,
      Credit
    },
    store,
    data(){
      return {
        closing: false,
        showsCredit: false, 
      };
    },
    methods: {
      onClick(){
        this.closing = true;
        this.$store.commit("playSound", {key: "gameStart"});
      },
      onAnimationEnter(el, completed){
        gsap.fromTo(
          [this.$refs.shutter1, this.$refs.shutter2],
          {
            scaleX: 0,
          },
          {
            duration: 0.5,
            scaleX: 1,
            ease: 'expo.out',
            onComplete: completed,
          });
        gsap.fromTo(
          [this.$refs.shutter3, this.$refs.shutter4],
          {
            scaleY: 0,
          },
          {
            duration: 0.8,
            scaleY: 1,
            ease: 'expo.out',
          });
      },
      onAnimationComplete(){
        this.$emit("loadScene", {sceneName: "mainMenu"});
      },
      showCredit(){
        this.$store.commit("playSound", {key: "menuOpen"});
        this.showsCredit = true;
      },
      closeCredit(){
        this.$store.commit("playSound", {key: "menuClose"});
        this.showsCredit = false;
      },
    },
    mounted(){
      // シーン飛ばし用
      //this.$emit("loadScene", {sceneName: "mainMenu"});
      //this.$emit("loadScene", {sceneName: "inGame", params: {characterId: 1, chapterId: 1}});
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .scene{
    position: relative;
    color: $white;
    width: 100%;
    height: 100%;
    border: 1px solid $gray2;
  }
  .credit_button{
    position: absolute;
    bottom: $space-m;
    right: $space-m;
  }
  .title{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .tops{
      .logo{
        width: 100%;
        height: 200px;
        margin-bottom: $space-m;
        display: flex;
        justify-content: center;
        align-items: center;

        .container{
          width: 200px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: $space-m;
          margin: auto;
          transition: gap 0.2s;
          &:hover{            
            gap: $space-m * 3;
          }
          .box{
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $white;
            .letter{
              // 要素は中央に置かれているが、視覚的にセンタリングできていないので調整用
              margin-top: -6px; 
              font-weight: bold;
              font-size: $font-size-xlarge;
              line-height: 100%;
              color: $frame-background;
            }
          }
        }
      }
      .start{
        width: 100%;
        text-align: center;
        font-size: $font-size-medium;
      }
    }
    .bottoms{
      .name_area{
        width: 60%;
        margin-left: 20%;
        text-align: center;
        border-top: 1px solid $gray2;
        border-bottom: 1px solid $gray2;
        padding: $space-m;
      }
    }
    .shutters{
      position: absolute;
      width: 100%;
      height: 100%;
      .horizontal{
        position: absolute;
        width: 100%;
        height: 100%;
        .shutter1{
          width: 100%;
          height: 50%;
          background-color: $red3;
          transform-origin: left;
        }
        .shutter2{
          width: 100%;
          height: 50%;
          background-color: $yellow3;
          transform-origin: right;
        }
      }
      .vertical{
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.5;
        .shutter3{
          width: 50%;
          height: 100%;
          background-color: $blue3;
          transform-origin: top;
        }
        .shutter4{
          width: 50%;
          height: 100%;
          background-color: $purple3;
          transform-origin: bottom;
        }
      }
    }
  }
</style>
