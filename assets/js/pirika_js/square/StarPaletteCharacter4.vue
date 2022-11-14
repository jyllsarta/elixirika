<template lang="pug">
  .star_palette
    .background.with_drop_shadow
      img(src="/images/square/svg/star_palette5.svg")
    .field
      .player(@click="onAttack" ref="player")
        .img
          img(src="/images/square/characters/ayame1.png")
      transition(name="enemy-appear")
        .foreground_enemy(v-if="isAliveForegroundEnemy", :key="foregroundEnemy.id")
          .img
            img(:src="`/images/square/characters/${foregroundEnemy.image}.png`")
      .foreground_enemy_hp(:class="hpClass(referenceCurrentHp)")
        | {{referenceCurrentHp}}
      .damage(ref="damage")
        | {{referenceDamage}}
      transition(name="shield-appear")
        .foreground_enemy_shield_hp(v-if="foregroundEnemy.shield > 0" :class="hpClass(referenceCurrentShieldHp)")
          | {{referenceCurrentShieldHp}}
      transition(name="shield-appear")
        img.foreground_enemy_shield(v-if="foregroundEnemy.shield > 0" src="/images/square/characters/barrier.png")
      transition-group(class="background_enemies" name="background")
        .enemy(v-for="enemy in backgroundEnemies" :key="enemy.id")
          .content
            .img
              img(:src="`/images/square/characters/${enemy.image}.png`")
            .hp(:class="hpClass(enemy.hp)")
              | {{enemy.hp}}
      .attack_effect
        .line1.line(ref="line1")
        .line2.line(ref="line2")
        .line3.line(ref="line3")
      transition(name="win")
        .cleared(v-if="!foregroundEnemy.hp")
          .text
              | 勝利！
      transition(name="win-character")
        .cleared_character(v-if="!foregroundEnemy.hp")
          .img
            img(src="/images/square/characters/ayame2.png")
      .notes
        .note(v-if="thereIsMaxDamageEnemy")
          | スピカは3以上のダメージを3にする
        .note(v-if="thereIsShieldEnemy")
          | 盾はドローボタンで引き直すと復活する
</template>

<script lang="javascript">
  import Vue from 'vue';
  import Model from "./packs/model";
  import gsap from 'gsap';
  import store from "./packs/store";

  export default Vue.extend({
    store,
    props: {
      model: Model,
    },
    data: function(){
      return {
        referenceCurrentHp: 0,
        referenceCurrentShieldHp: 0,
        referenceDamage: 0,
      };
    },
    mounted() {
      this.syncCurrentHp();
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
      },
      thereIsMaxDamageEnemy(){
        return this.aliveEnemies.some(enemy=>enemy.maxDamage !== -1);
      },
      thereIsShieldEnemy(){
        return this.aliveEnemies.some(enemy=>enemy.shieldMax > 0);
      },
      isAliveForegroundEnemy(){
        return this.foregroundEnemy.hp > 0;
      }
    },
    methods: {
      syncCurrentHp(){
        this.referenceCurrentHp = this.foregroundEnemy.hp;
        this.referenceCurrentShieldHp = this.foregroundEnemy.shield;
      },
      syncCurrentShield(){
        this.referenceCurrentShieldHp = this.foregroundEnemy.shield;
      },
      hpClass(hp){
        if(hp >= 10){
          return "hp3";
        }
        if(hp >= 5){
          return "hp2";
        }
        return "hp1";
      },
      movePlayer(){
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
      },
      slashEffect(){
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
      popDamageValue(){
        const damageTimeline = gsap.timeline();
        damageTimeline
          .to( this.$refs.damage, { x:  -5, opacity:   0, scale: 1.2, duration: 0.00 })
          .to( this.$refs.damage, { x:   0, opacity:   1, scale:   1, duration: 0.10 })
          .to( this.$refs.damage, { x:   0, opacity:   1, scale:   1, duration: 1.00 })
          .to( this.$refs.damage, { x:   5, opacity:   0, scale: 1.2, duration: 0.10 })
      },      
      async onAttack(showDamageValue = false){
        this.movePlayer();
        this.slashEffect();
        if(showDamageValue){
          this.popDamageValue();
        }
        this.$store.commit("playSound", {key: "attack"});
        // アニメーションの最後に合わせるほうが行儀良くはある
        await this.$delay(1000);
        this.syncCurrentHp();
      },
    },
    watch: {
      // HPさがる ID変化あり: 攻撃で倒したに違いない
      // HPあがる ID変化あり: 攻撃で倒したに違いない もしくはリセット
      // HPさがる ID変化なし: 攻撃で削ったに違いない
      // HPあがる ID変化なし: リセット
      "foregroundEnemy.id": function(newId, prevId){
        const newEnemy = this.model.character.uniqueParameters.enemies.find(enemy=>enemy.id === newId);
        const enemy = this.model.character.uniqueParameters.enemies.find(enemy=>enemy.id === prevId);
        // リセット検出 出現順が巻き戻っていたら演出しない
        if(newEnemy?.order < enemy?.order){
          console.log("ID巻き戻り検出")
          this.syncCurrentHp();
          return;
        }
        this.onAttack(true);
        const { power } = enemy.damageHistory[enemy.damageHistory.length - 1];
        this.referenceDamage = power;
        setTimeout(()=>{this.$store.commit("playSound", {key: "defeat"})}, 1000);
      },
      "foregroundEnemy.hp": function(newHp, prevHp){
        // リセット検出 ヒストリーが空なら演出しない
        console.log(this.foregroundEnemy.damageHistory);
        if(this.foregroundEnemy.damageHistory?.length === 0){
          this.syncCurrentHp();
          return;
        }
        if(prevHp < newHp){
          return;
        }
        
        this.onAttack(true);
        if(prevHp && newHp){
          this.referenceDamage = prevHp - newHp;
        }
        if(newHp > 0){
          setTimeout(()=>{this.$store.commit("playSound", {key: "damage"})}, 1000);
        }
      },
      "foregroundEnemy.shield": function(after, before){
        if(before > 0){
          // シールドが削れたタイミングではHPは減らない
          this.onAttack(false);
          setTimeout(()=>{this.$store.commit("playSound", {key: "shield"})}, 1000);
        }
        if(before === 0 && after > 0){
          this.syncCurrentShield();
        }
      },
    }
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
        bottom: 0;
        width: 80px;
        height: 80px;
        // 味方攻撃 -> 倒れる のアニメーションにしたいので、ここで特別にdelayをかけてる
        transition-delay: 0.9s;
        .img img{
          width: 100%;
          height: 100%;
        }
      }
      .foreground_enemy_hp{
          position: absolute;
          left: 300px;
          top: 8px;
          width: 80px;
          height: $font-size-medium;
          line-height: 100%;
          text-align: center;
          font-size: $font-size-medium;
        }
      .damage{
          position: absolute;
          left: 280px;
          top: 8px;
          width: 80px;
          height: $font-size-large;
          line-height: 100%;
          text-align: center;
          font-size: $font-size-medium;
          opacity: 0;
        }
      .foreground_enemy_shield_hp{
          position: absolute;
          left: 260px;
          top: 8px;
          width: 80px;
          height: $font-size-medium;
          line-height: 100%;
          text-align: center;
          font-size: $font-size-medium;
        }
      .foreground_enemy_shield{
          position: absolute;
          left: 270px;
          top: 8px;
          width: 80px;
          height: 80px;
          transform: scale(-1, 1);
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
      }
    }
    .cleared_character{
      position: absolute;
      width: 110px;
      height: 110px;
      right: 20%;
      bottom: -10px;
      .img img{
        width: 100%;
        height: 100%;
      }
    }

    .notes{
      font-size: $font-size-mini;
      position: absolute;
      right: 3px;
      bottom: 3px;
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
      transition-delay: 0.5s;
    }
    .enemy-appear-leave-active {
      transition: all 1s linear;
      transition-delay: 0.5s;
    }
    .enemy-appear-enter{
      transform: translateX(30px);
      opacity: 0;
    }
    .enemy-appear-leave-to{
      transform: translate(130px, -40px) rotate(270deg);
      opacity: 0;
    }

    .background-leave-active {
      position: absolute;
      transition: all 1.3s;
      // 味方攻撃 -> 倒れる のアニメーションにしたいので、ここで特別にdelayをかけてる
        transition-delay: 0.9s;
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
      // 味方攻撃 -> 倒れる のアニメーションにしたいので、ここで特別にdelayをかけてる
      transition-delay: 0.9s;
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

    .win-character-enter-active {
      position: absolute;
      transition: all 0.2s;
      transition-delay: 1.0s;
    }
    .win-character-enter{
      transform: translateY(30px);
      opacity: 0;
    }

    .shield-appear-enter-active {
      transition: all 0.5s;
      transition-delay: 0.5s;
    }
    .shield-appear-leave-active {
      transition: all 0.5s;
      transition-delay: 0.5s;
    }
    .shield-appear-enter{
      opacity: 0;
    }
    .shield-appear-leave-to{
      opacity: 0;
    }
  }

</style>
