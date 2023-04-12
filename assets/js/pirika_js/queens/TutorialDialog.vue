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
            <div class="say" v-for="say in says" :key="say">{{say}}</div>
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
  data(){
    return {
      says: [
        "～ようこそ～",
        "クイーンズクラブへようこそ、おにーさん♡",
        "支配人のイカリだよ♡",
        "ショックで記憶が混濁していたようだけど、おにーさんには1000000Gの借金があるよ",
        "ギャンブルの心得はあるみたいだから、支払いは無期限で待ってるよ",
        "借金があるうちは当然外には出られないけどね♡",
        "おにーさんはこれから「回収者」としての仕事をしてもらうよ",
        "スタッフだと気取られないようにお客さんとカードゲームをして、儲かってるお客さんのあぶく銭をうまく回収してね",
        "まあ、おにーさんうちの常連だったから、基本的にどんなプレイをしてもスタッフであることはバレないとは思う",
        "負け始めたお客さんが帰らないような手はこっちで打っておくから、好きにやって取り切れるだけ取りきってほしいな♡",
        "～クイーンズ～",
        "なんか忘れてそうだし、クイーンズのルールを解説するね♡",
        "同時に手札から2枚カードを出して、目標値をなるべく超えないように近い数字を出すゲームだよ",
        "最初に5枚カードを持ってスタートして、場にカードを2枚めくるの",
        "この2枚の合計値が目標の数字になるね",
        "お互いにカードを2枚伏せたら公開して、目標に近いほうが勝ち",
        "バースト(目標値オーバー)は当然負けになるけど、二人ともがバーストしたら超過分が小さい方の勝ちね",
        "ここまでが1ラウンドで、ラウンドが終了したら2枚引き直すよ",
        "～ラウンド～",
        "1ラウンドごとの争奪点数は1, 2, 3... とラウンドごとに1点ずつ増えていくよ",
        "で、ラウンドに負けたほうに点数を加算していくのね",
        "この積算点数が8点を超えたらゲーム終了！負けたプレイヤーの失点分のチップを一方的に相手に渡すことになるよ",
        "1, 3, 4ラウンド目で勝ったら合計8点だから4ラウンド目で終了、8チップもらえるって感じね",
        "その他だと 1, 2, 3 ラウンドは勝ったけど 4, 5 で負けちゃったら、6対9で決着！この場合は9チップの支払いになるね",
        "ラウンドが進めば進むほど負けられない戦いになっていく仕組み、緊張するね！",
        "あ、引き分けになったらどっちの点数も変動しないで、次のラウンドでまとめて精算するよ",
        "～SPについて～",
        "ここまでがゲームの基本ルールだったんだけど、ピンチに役立つシステムがあるよ",
        "失点分だけSPってポイントが貯まるようになってるんだ",
        "手札を選ぶ前、溜まったSPを使って手札を入れ替えたり、カードを生成したりやりたい放題できるよ",
        "もしかしたら、序盤はあえて失点して溜まったSPで逆転するのも有効かもね",
        "当たり前だけど相手もSPを使うことはできるから、使い所が上手じゃないと期待値のエッジは作り出せないからね",
        "～がんばってね～",
        "...と、ここまでいっぺんに話しちゃったんだけど、まあ覚えてるよね？",
        "完璧に覚えてなくてもUI上である程度察せるようにはなってるはずだから、一回やってから見直すくらいでいいと思うね♡",
        "がんばってねおにーさん♡借金稼ぎきらないと帰れないぞー♡",
      ]
    }
  },
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
          gap: 10px;
          height: 100%;
          padding: 30px 10px 30px 10px;
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
