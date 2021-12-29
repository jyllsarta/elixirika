<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette5.svg")
    .field
      .player(@click="onAttack" ref="player")
        .img
          img(:src="`/images/square/characters/spica.png`")
      .attack_effect
        .line1.line(ref="line1")
        .line2.line(ref="line2")
        .line3.line(ref="line3")
      transition(name="enemy-appear")
        .foreground_enemy(v-if="foregroundEnemy.hp > 0", :key="foregroundEnemy.id")
          .img
            img(:src="`/images/square/characters/${foregroundEnemy.image}.png`")
          .hp(:class="hpClass(foregroundEnemy.hp)")
            | {{foregroundEnemy.hp}}
      transition-group(class="background_enemies" name="background")
        .enemy(v-for="enemy in backgroundEnemies" :key="enemy.id")
          .content
            .img
              img(:src="`/images/square/characters/${enemy.image}.png`")
            .hp(:class="hpClass(enemy.hp)")
              | {{enemy.hpMax}}
      transition(name="win")
        .cleared(v-if="!foregroundEnemy.hp")
          .text
            | 勝利！
</template>

<script lang="typescript">
  import Vue from 'vue';
  import Model from "./packs/model"
  import gsap from 'gsap';

  export default Vue.extend({
    props: {
      model: Model,
    },
    computed: {
      aliveEnemies(){
        return this.model.character.uniqueParameters.enemies.filter(enemy=>enemy.hp>0);
      },
      foregroundEnemy(){
        return this.aliveEnemies[0] || {};
      },
      backgroundEnemies(){
        return this.aliveEnemies.slice(1, Math.inf);
      }
    },
    methods: {
      hpClass(hp){
        if(hp >= 10){
          return "hp3";
        }
        if(hp >= 5){
          return "hp2";
        }
        return "hp1"
      },
      onAttack(){
        const playerTimeline = gsap.timeline();
        playerTimeline
          .to(
            this.$refs.player,
            {
              x: 45,
              y: -20,
              duration: 0.08
            },
          )
          .to(
            this.$refs.player,
            {
              x: 60,
              y: 0,
              duration: 0.08
            },
          )
          .to(
            this.$refs.player,
            {
              x: 0,
              y: 0,
              duration: 0.2
            },
            "+=0.5"
          );

        const effectTimeline1 = gsap.timeline();
        effectTimeline1
          .to( this.$refs.line1, { x: -50, opacity:   0, duration: 0.15 })
          .to( this.$refs.line1, { x:   0, opacity: 0.7, duration: 0.15 })
          .to( this.$refs.line1, { x:  50, opacity:   0, duration: 0.15 });

        const effectTimeline2 = gsap.timeline();
        effectTimeline2
          .to( this.$refs.line2, { x: -50, opacity:   0, duration: 0.20 })
          .to( this.$refs.line2, { x:   0, opacity: 0.7, duration: 0.15 })
          .to( this.$refs.line2, { x:  50, opacity:   0, duration: 0.15 });

        const effectTimeline3 = gsap.timeline();
        effectTimeline3
          .to( this.$refs.line3, { x: -50, opacity:   0, duration: 0.30 })
          .to( this.$refs.line3, { x:   0, opacity: 0.7, duration: 0.15 })
          .to( this.$refs.line3, { x:  50, opacity:   0, duration: 0.15 });

      },
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .star_palette{
    position: absolute;
    width: 100%;
    height: 100%;
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
      }
    }
    .field{
      position: absolute;
      width: 100%;
      height: unquote("calc(100% - 27px)");
      .player{
        position: absolute;
        left: 100px;
        width: 80px;
        height: 80px;
        bottom: 0;
        .img img{
          width: 100%;
          height: 100%;
        }
      }
      .attack_effect{
        position: absolute;
        bottom: 20px;
        left: 280px;
        width: 60px;
        height: 40px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 8px;
        transform: rotate(30deg);
        .line{
          width: 60px;
          height: 2px;
          background-color: white;
          opacity: 0;
        }
      }
      .foreground_enemy{
        position: absolute;
        left: 300px;
        width: 80px;
        height: 80px;
        bottom: 0;
        .img img{
          width: 100%;
          height: 100%;
        }
        .hp{
          position: absolute;
          top: -10px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: $font-size-medium;
        }
      }
      .background_enemies{
        display: flex;
        flex-direction: row;
        position: absolute;
        left: 500px;
        bottom: 0;
        width: 400px;
        height: 60px;
        gap: $space-m;
        .enemy{
          .content{
            position: relative;
            width: 60px;
            height: 60px;
            .img img{
              width: 100%;
              height: 100%;
            }
            .hp{
              position: absolute;
              top: -20px;
              left: 0;
              width: 100%;
              text-align: center;
              font-size: $font-size-medium;
            }
          }
        }
      }
      .cleared{
        position: absolute;
        width: 100%;
        height: 100%;
        .text{
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $font-size-large;
        }
        // 今後 アヤメちゃんイラストが追加される
      }
    }

    .hp1{
      text-shadow: 0px 0px 2px $red1, 0px 0px 2px $red1;
    }

    .hp2{
      text-shadow: 0px 0px 2px $yellow1, 0px 0px 2px $yellow1;
    }

    .hp3{
      text-shadow: 0px 0px 2px $blue1, 0px 0px 2px $blue1;
    }

    .enemy-appear-enter-active {
      transition: all 1.3s;
    }
    .enemy-appear-leave-active {
      transition: all 1s linear;
    }
    .enemy-appear-enter{
      transform: translateX(30px);
      opacity: 0;
    }
    .enemy-appear-leave-to{
      transform: translate(130px, -40px) rotate(270deg);
      opacity: 0;
    }

    .background-enter-active {
      position: absolute;
      transition: all 0.4s;
    }
    .background-leave-active {
      position: absolute;
      transition: all 0.4s;
    }
    .background-enter{
      transform: translateX(20px);
      opacity: 0;
    }
    .background-leave-to{
      transform: translateX(-20px);
      opacity: 0;
    }
    .background-move {
      transition: transform 1s;
    }

    .win-enter-active {
      position: absolute;
      transition: all 0.4s;
      transition-delay: 0.5s;
    }
    .win-enter{
      transform: scale(4);
      opacity: 0;
    }
  }

</style>
