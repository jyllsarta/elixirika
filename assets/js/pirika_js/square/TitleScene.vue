
<template lang="pug">
  .scene
    .title(@click="onClick")
      .tops
        .logo
          img(src="/images/square/title.png")
        .start
          | クリックしてはじめる
      .bottoms
        .name_area(@click.stop)
          NameArea
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
      :width="'160px'"
      :height="'40px'"
      :color="'blue'"
      :label="'クレジット'"
    )
    GeneralButton.ranking_button(
      @click="showRanking()"
      :disabled="false"
      :flashing="false"
      :width="'160px'"
      :height="'40px'"
      :color="'blue'"
      :label="'ランキング'"
    )
    GeneralButton.message_button(
      @click="showMessage()"
      :disabled="false"
      :flashing="false"
      :width="'160px'"
      :height="'40px'"
      :color="'blue'"
      :label="'おたより'"
    )
    Credit.credit(v-if="showsCredit" @close="closeCredit")
    Ranking.ranking(v-if="showsRanking" @close="closeRanking")
</template>

<script lang="typescript">
  import Vue from 'vue';
  import NameArea from "./NameArea.vue";
  import gsap from 'gsap';
  import store from "./packs/store";
  import GeneralButton from "./GeneralButton.vue";
  import Credit from "./Credit.vue";
  import Ranking from "./Ranking.vue";

  export default Vue.extend({
    components: {
      NameArea,
      GeneralButton,
      Credit,
      Ranking
    },
    store,
    data(){
      return {
        closing: false,
        showsCredit: false, 
        showsRanking: false,
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
        this.tryFillEmptyName();
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
      showRanking(){
        this.$store.commit("playSound", {key: "menuOpen"});
        this.showsRanking = true;
      },
      closeRanking(){
        this.$store.commit("playSound", {key: "menuClose"});
        this.showsRanking = false;
      },
      showMessage(){
        this.$store.commit("playSound", {key: "menuOpen"});
        this.$store.commit("showMessage");
      },
      tryFillEmptyName(){
        if(!localStorage.rawNameSquare){
          const randomName = Math.floor(Math.random() * Math.pow(2, 32)).toString(16);
          localStorage.rawNameSquare = randomName;
        }
      }
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
  .ranking_button{
    position: absolute;
    bottom: $space-m * 2 + 40px;
    right: $space-m;
  }
  .message_button{
    position: absolute;
    bottom: $space-m * 3 + 40px * 2;
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
        margin-bottom: $space-m;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 80%;
          animation: title 4.5s infinite alternate;
        }
      }
      .start{
        margin-top: 50px;
        width: 100%;
        text-align: center;
        font-size: $font-size-medium;
        animation: tika 1s infinite alternate;
      }
      @keyframes tika {
        0%{
          opacity: 0.5;
        }
        100%{
          opacity: 1;
        }
      }
      @keyframes title {
        0%{
          opacity: 0.8;
        }
        100%{
          filter: brightness(110%);
        }
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
          background-color: #4a4566;
          transform-origin: left;
        }
        .shutter2{
          width: 100%;
          height: 50%;
          background-color: #311d36;
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
          background-color: #4a4566;
          transform-origin: top;
        }
        .shutter4{
          width: 50%;
          height: 100%;
          background-color: #311d36;
          transform-origin: bottom;
        }
      }
    }
  }
</style>
