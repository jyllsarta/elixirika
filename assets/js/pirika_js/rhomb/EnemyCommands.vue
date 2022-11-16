<template>
    <div class="commands">
        <div class="title">ENEMY ACTION</div>
        <div class="turns">
            <div class="bullets" v-for="turn in turnsWithBullets" :key="turn.id" :class="{this_turn: totalTurnCount === turn.turn}">
                <Bullet v-for="bullet of turn.bullets" :type="bullet.type" :key="bullet.id" :marked-at="null"></Bullet>
            </div>
        </div>
    </div>
</template>

<script>
  
  import Bullet from "./Bullet.vue";
  import Model from "./packs/model";

  export default({
    components: {
      Bullet,
    },
    props: {
      model: Model,
    },
    computed: {
      turnsWithBullets(){
        const turns = this.model.masterdata.getAll("turns").sort(turn=>turn.turn);
        // この関連を引っ張ってくる処理はマスターデータ構築時点でやっておくべきかも？
        const withBullets = turns.map(turn=>Object.assign(turn, {bullets: this.model.masterdata.getBy("bullets", "id", turn.bullet_ids)}));
        return withBullets;
      },
      // これ phaseEnemyShoot とロジック重複してる
      totalTurnCount(){
        const totalTurnCount = this.model.masterdata.master.turns.length;
        return this.model.turn % totalTurnCount;
      }
    }
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .commands{
    .title{
      line-height: 100%;
      font-size: 8px;
      width: 100%;
      text-align: center;
      color: cyan;
    }

    .turns{
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      .bullets{
        display: flex;
        gap: 8px;
        padding: 4px 8px 4px 8px;
        border-radius: 40px;
        border: 1px solid transparent;
        &.this_turn{
          border: 1px solid rgb(136, 71, 71);
        }
      }
    }
  }
</style>
