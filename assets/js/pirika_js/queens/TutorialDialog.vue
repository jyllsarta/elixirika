<template>
  <div class="dialog">
    <div class="_back" @click="closeMenu"/>
    <div class="content">
      <div class="main_image">
        <img class="image" src="images/queens/tutorial1.png" alt="">
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
            <div :class="['say', say.side]" v-for="say in says" :key="say.id">{{say.text}}</div>
          </div>
        </div>
        <div class="right_character">
          <img :src="`images/queens/characters/face-queens1.png`" alt="" class="character">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    const says = [
        {"id": 1, "side": "center", "character_id": 1, "face_id": 1, "text": "～ようこそ～"},
        {"id": 2, "side": "left", "character_id": 2, "face_id": 4, "text": "クイーンズクラブへようこそ、おにーさん♡"},
        {"id": 3, "side": "left", "character_id": 2, "face_id": 1, "text": "支配人のイカリだよ♡"},
        {"id": 4, "side": "left", "character_id": 2, "face_id": 3, "text": "ショックで記憶が混濁していたようだけど、おにーさんには1000000Gの借金があるよ"},
        {"id": 5, "side": "left", "character_id": 2, "face_id": 1, "text": "ギャンブルの心得はあるみたいだから、支払いは無期限で待ってるよ"},
        {"id": 6, "side": "left", "character_id": 2, "face_id": 3, "text": "借金があるうちは当然外には出られないけどね♡"},
        {"id": 7, "side": "left", "character_id": 2, "face_id": 1, "text": "おにーさんはこれから「回収者」としての仕事をしてもらうよ"},
        {"id": 8, "side": "left", "character_id": 2, "face_id": 4, "text": "スタッフだと気取られないようにお客さんとカードゲームをして、儲かってるお客さんのあぶく銭をうまく回収してね"},
        {"id": 9, "side": "left", "character_id": 2, "face_id": 4, "text": "まあ、おにーさんうちの常連だったから、基本的にどんなプレイをしてもスタッフであることはバレないとは思う"},
        {"id": 10, "side": "left", "character_id": 2, "face_id": 5, "text": "負け始めたお客さんが帰らないような手はこっちで打っておくから、好きにやって取り切れるだけ取りきってほしいな♡"},
        {"id": 11, "side": "center", "character_id": 1, "face_id": 1, "text": "～クイーンズ～"},
        {"id": 12, "side": "left", "character_id": 2, "face_id": 1, "text": "なんか忘れてそうだし、クイーンズのルールを解説するね♡"},
        {"id": 13, "side": "left", "character_id": 2, "face_id": 1, "text": "同時に手札から2枚カードを出して、目標値をなるべく超えないように近い数字を出すゲームだよ"},
        {"id": 14, "side": "left", "character_id": 2, "face_id": 1, "text": "最初に5枚カードを持ってスタートして、場にカードを2枚めくるの"},
        {"id": 15, "side": "left", "character_id": 2, "face_id": 1, "text": "この2枚の合計値が目標の数字になるね"},
        {"id": 16, "side": "left", "character_id": 2, "face_id": 1, "text": "お互いにカードを2枚伏せたら公開して、目標に近いほうが勝ち"},
        {"id": 17, "side": "left", "character_id": 2, "face_id": 4, "text": "バースト(目標値オーバー)は当然負けになるけど、二人ともがバーストしたら超過分が小さい方の勝ちね"},
        {"id": 18, "side": "left", "character_id": 2, "face_id": 1, "text": "ここまでが1ラウンドで、ラウンドが終了したら2枚引き直すよ"},
        {"id": 19, "side": "center", "character_id": 1, "face_id": 1, "text": "～ラウンド～"},
        {"id": 20, "side": "left", "character_id": 2, "face_id": 1, "text": "1ラウンドごとの争奪点数は1,2,3...とラウンドごとに1点ずつ増えていくよ"},
        {"id": 21, "side": "left", "character_id": 2, "face_id": 4, "text": "で、ラウンドに負けたほうに点数を加算していくのね"},
        {"id": 22, "side": "left", "character_id": 2, "face_id": 3, "text": "この積算点数が8点を超えたらゲーム終了！負けたプレイヤーの失点分のチップを一方的に相手に渡すことになるよ"},
        {"id": 23, "side": "left", "character_id": 2, "face_id": 1, "text": "1,3,4ラウンド目で勝ったら合計8点だから4ラウンド目で終了、8チップもらえるって感じね"},
        {"id": 24, "side": "left", "character_id": 2, "face_id": 2, "text": "その他だと1,2,3ラウンドは勝ったけど4,5で負けちゃったら、6対9で決着！この場合は9チップの支払いになるね"},
        {"id": 25, "side": "left", "character_id": 2, "face_id": 4, "text": "ラウンドが進めば進むほど負けられない戦いになっていく仕組み、緊張するね！"},
        {"id": 26, "side": "left", "character_id": 2, "face_id": 1, "text": "あ、引き分けになったらどっちの点数も変動しないで、次のラウンドでまとめて精算するよ"},
        {"id": 27, "side": "center", "character_id": 1, "face_id": 1, "text": "～SPについて～"},
        {"id": 28, "side": "left", "character_id": 2, "face_id": 1, "text": "ここまでがゲームの基本ルールだったんだけど、ピンチに役立つシステムがあるよ"},
        {"id": 29, "side": "left", "character_id": 2, "face_id": 1, "text": "失点分だけSPってポイントが貯まるようになってるんだ"},
        {"id": 30, "side": "left", "character_id": 2, "face_id": 4, "text": "手札を選ぶ前、溜まったSPを使って手札を入れ替えたり、カードを生成したりやりたい放題できるよ"},
        {"id": 31, "side": "left", "character_id": 2, "face_id": 2, "text": "もしかしたら、序盤はあえて失点して溜まったSPで逆転するのも有効かもね"},
        {"id": 32, "side": "left", "character_id": 2, "face_id": 4, "text": "当たり前だけど相手もSPを使うことはできるから、使い所が上手じゃないと期待値のエッジは作り出せないからね"},
        {"id": 33, "side": "center", "character_id": 1, "face_id": 1, "text": "～がんばってね～"},
        {"id": 34, "side": "left", "character_id": 2, "face_id": 4, "text": "...と、ここまでいっぺんに話しちゃったんだけど、まあ覚えてるよね？"},
        {"id": 35, "side": "left", "character_id": 2, "face_id": 3, "text": "完璧に覚えてなくてもUI上である程度察せるようにはなってるはずだから、一回やってから見直すくらいでいいと思うね♡"},
        {"id": 36, "side": "left", "character_id": 2, "face_id": 5, "text": "がんばってねおにーさん♡借金稼ぎきらないと帰れないぞー♡"},
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
      const index = Math.floor(this.$refs.says.scrollTop / 120);
      console.log(index);
      this.currentSay = this.says[index];
    }
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
    top: 2%;
    left: 20%;
    height: 96%;
    width: 60%;
    background-color: rgb(38, 40, 42);
    border: 1px solid rgb(255, 254, 254);
    .main_image{
      padding-top: 10px;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .image{
        width: 80%;
      }
    }
    .skit_area{
      display: flex;
      height: 50%;
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
          gap: 30px;
          height: 100%;
          padding: 120px 10px 120px 10px;
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
            min-height: 90px;
          }
          .center{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 25px;
            margin-left: 25px;
            background-color: rgb(66, 69, 89);
          }
          .left{
            margin-right: 50px;
          }
          .right{
            margin-left: 50px;
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
