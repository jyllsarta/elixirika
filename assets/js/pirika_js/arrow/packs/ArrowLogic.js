import Ball from "./Ball.js"
import Pointer from "./Pointer.js"
import GameState from "./GameState.js"
import SoundManager from "./SoundManager.js"
import Constants from "./Constants.js"
import OnlineRanking from "./OnlineRanking.js"

class ArrowLogic{
  constructor(){
    this.soundManager = new SoundManager();
    this.onlineRanking = new OnlineRanking(location.href, location.href + "/ranking", location.href + "/high_score")
    this.highScore = 0;
    this.loadSounds();
    this.reset();
  }

  score(){
    return Math.floor(this.timeScore + this.removeScore);
  }

  update(timeDelta){
    switch (this.gameState) {
      case 0:
        break;
      case 1:
        this.checkDamage(timeDelta);
        this.moveBall(timeDelta);
        this.proceedTimerAndFireEvent(timeDelta);
        break;
      case 2:
        break;
    }
  }

  setPointerPosition(x, y){
    this.pointer.setPosition(x, y);
  }

  startGame(){
    this.soundManager.play("start");
    this.gameState = 1;
  }

  hpRate(){
    return this.hp / this.initialHp;
  }

  chargeRate(){
    return Math.min(this.charge / Constants.chargeMax, 1);
  }

  resetCharge(){
    this.charge = 0;
    this.isCharging = false;
  }

  onMouseDown(){
    // 必殺ゲージ溜め
    this.resetCharge();
    if(this.hasSufficientEnergy()){
      this.isCharging = true;
    }
  }

  onMouseUp(){
    if(this.isChargeFull() && this.hasSufficientEnergy()){
      this.discharge(this.pointer.x, this.pointer.y, Constants.dischargeRadius);
      this.energy = 0;
      this.soundManager.play("discharge");
      this.isThisFrameDischargeReleased = true;
    }
    this.isCharging = false;
  }

  onMoved(){
    if(this.hasSufficientEnergy() && this.charge > 0){
      this.soundManager.play("phew");
    }
    this.resetCharge();
  }
  isChargeFull(){
    return this.charge > Constants.chargeMax;
  }

  hasSufficientEnergy(){
    return this.energy > Constants.energyMax;
  }

  onClickResetButton(){
    this.soundManager.play("reset");
    this.reset();
  }

  setName(name){
    this.username = name;
    this.fetchHighScore();
  }

  // -- private --

  // このフレームにちょうどタイマーが発動したかどうか
  // = 前のフレームではthreshold以下、現在のフレームではthreshold以上である
  isThisFrameTimerReached(timeDelta, timePiled, threshold){
    return timePiled - timeDelta <= threshold && threshold < timePiled;
  }

  // タイマーによって発動するイベントの処理
  // なーんかちょっとあまりにも愚直なので、いつか registerTimerEvent(callback, everyXSeconds) みたいなインターフェースで登録できるようにしてみたいな
  proceedTimerAndFireEvent(timeDelta){

    this.isThisFrameDischargeReleased = false;
    this.playtime += timeDelta;
    if(this.isCharging){
      this.charge += timeDelta;
    }
    if(this.isThisFrameTimerReached(timeDelta, this.charge, Constants.chargeMax)){
      this.soundManager.play("charge_complete");
    }

    this.spawnNewBallTimer += timeDelta;
    let interval = this.currentBallSpawnInterval();
    if(interval < this.spawnNewBallTimer){
      this.spawnNewBallTimer -= interval;
      this.soundManager.play("spawn");
      this.createRandomBall();
    }
    this.timeScore += timeDelta;
    this.healEventTimer += timeDelta;

    this.sweepRemovedBalls();

    if(Constants.healIntervalTimeSeconds < this.healEventTimer){
      this.healEventTimer -= Constants.healIntervalTimeSeconds;
      this.heal(Constants.healAmountPerEvent);
      const energyRecovered = Constants.addEnergyAmountPerEvent * (this.hpRate() / 2 + 0.5);
      this.energy += energyRecovered;
      // いま energy最大になった場合 音を鳴らす
      if(this.isThisFrameTimerReached(energyRecovered, this.energy, Constants.energyMax)){
        this.soundManager.play("discharge_available");
      }
    }
  }

  sweepRemovedBalls(){
    this.balls = this.balls.filter(ball=> ball.removedAt === null || this.timeScore < ball.removedAt + 1);
  }

  currentBallSpawnInterval(){
    let prevInterval = null;
    for(let [seconds, interval] of Constants.spawnBallIntervalTimes){
      if (this.playtime < seconds){
        return prevInterval;
      }
      prevInterval = interval;
    }
    return prevInterval;
  }

  moveBall(timeDelta){
    for(let ball of this.balls){
      if(ball.removedAt !== null){
        continue;
      }
      ball.x += ball.vx * timeDelta;
      ball.y += ball.vy * timeDelta;
      ball.reflect();
    }
  }

  checkDamage(timeDelta){
    // 全部の弾と当たり判定チェックするのは普通にO(n)なんで遅い
    // パフォーマンスによる問題が出たら枝刈りを頑張る
    // 時刻ベースにしたらここもダメージ量をTimeDeltaに比例させること
    for(let ball of this.balls){
      if(ball.removedAt !== null){
        continue;
      }
      let distance = this.distance(this.pointer.x, this.pointer.y, ball.x, ball.y);
      if(distance < Constants.shaveDamageRadius * (this.hpRate() * Constants.ratioOfHpRateToHitBox + Constants.minimumHitBoxSizeRate)){
        this.hp -= Constants.shaveDamageRate * timeDelta;
        this.soundManager.play("damage");
      }
      if(distance < Constants.hitDamageRadius * (this.hpRate() * Constants.ratioOfHpRateToHitBox + Constants.minimumHitBoxSizeRate)){
        this.hp -= Constants.hitDamageRate  * timeDelta;
        this.soundManager.play("damage2");
      }
    }

    if(this.hp <= 0){
      this.soundManager.play("dead");
      this.onlineRanking.submit(this.username, this.score(), this.removeScore, this.timeScore, (results) =>{this.onSucceedSendResult(results)});
      this.gameState = 2;
    }
  }

  onSucceedSendResult(results){
    this.isHighScore = results.data.is_high_score;
    if(this.isHighScore){
      this.soundManager.play("high_score");
    }
  }

  distance(x1, y1 ,x2 ,y2){
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  heal(value){
    // すでに全快のときには音を鳴らさない
    if(this.hp >= this.initialHp){
      return;
    }

    this.hp += value;
    if(this.hp > this.initialHp){
      this.hp = this.initialHp;
    }
    // sound の登録数と依存あるけどまあいいかな...
    const rand = Math.floor(Math.random() * 5) + 1;
    this.soundManager.play("heal" + rand);
  }

  createRandomBall(){
    const vx = Math.random() * Constants.maxBallVelocityX - Constants.maxBallVelocityX / 2;
    const vy = Math.random() * Constants.maxBallVelocityY - Constants.maxBallVelocityY / 2;

    // マンハッタン距離における速度になってしまっているけど気にしないことにする
    // vx + vy が 下位 25%, 50%, 25% の比率で色分けされるようにcolorIdを付与する
    const velocityMax = Constants.maxBallVelocityY + Constants.maxBallVelocityX;
    const velocity = Math.abs(vx) + Math.abs(vy);
    const colorId = Math.floor((velocity * 2 / velocityMax) * Constants.colorIdNum);
    this.balls.push(new Ball(Math.random(), 0, vx, vy, colorId));
  }

  discharge(x,y,r){
    let removedCount = 0;
    for(let ball of this.balls){
      let distance = this.distance(x, y, ball.x, ball.y);
      if(distance < r){
        ball.removedAt = this.timeScore;
        ball.removedCount++;
      }
    }

    this.lastRemoveResult = removedCount;
    this.removeScore += removedCount;
    this.lastRemovedPositionX = this.pointer.x + Math.random() * 0.2 - 0.1; // 横方向は若干ランダム
    this.lastRemovedPositionY = this.pointer.y - 0.1; // 消去リザルトはちょっと上に表示
    this.hp += removedCount * Constants.dischargeRemoveHealPoint;
  }

  reset(){
    this.balls = [];
    this.pointer = new Pointer(0.5, 0.5);
    this.gameState = 0;
    this.hp = Constants.initialHp;
    this.initialHp = Constants.initialHp;
    this.energy = 0;
    this.charge = 0;
    this.isCharging = false;
    this.spawnNewBallTimer = 0;
    this.healEventTimer = 0;
    this.timeScore = 0;
    this.removeScore = 0;
    this.playtime = 0;
    this.isThisFrameDischargeReleased = false;
    this.lastRemoveResult = 0;
    this.lastRemovedPositionX = 0;
    this.lastRemovedPositionY = 0;
    this.isHighScore = false;

    for(let i=0; i< Constants.initialBallCount; ++i){
      this.createRandomBall();
    }

    this.fetchHighScore();
    this.fetchRanking();
  }

  fetchRanking(){
    this.onlineRanking.getRanking((results)=>{this.ranking = results.data.ranking})
  }

  onReceiveHighScore(results){
    this.highScore = results.data.high_score;
  }

  fetchHighScore(){
    this.onlineRanking.getHighScore(this.username, (results)=>{this.onReceiveHighScore(results)});
  }

  loadSounds(){
    this.soundManager.register("spawn", "/game/arrow/sounds/spawn.wav", 0.04);
    this.soundManager.register("damage", "/game/arrow/sounds/damage.wav", 0.05);
    this.soundManager.register("damage2", "/game/arrow/sounds/damage.wav");
    this.soundManager.register("heal1", "/game/arrow/sounds/heal1.wav",0.1);
    this.soundManager.register("heal2", "/game/arrow/sounds/heal2.wav",0.1);
    this.soundManager.register("heal3", "/game/arrow/sounds/heal3.wav",0.1);
    this.soundManager.register("heal4", "/game/arrow/sounds/heal4.wav",0.1);
    this.soundManager.register("heal5", "/game/arrow/sounds/heal5.wav",0.1);
    this.soundManager.register("reset", "/game/arrow/sounds/reset.wav");
    this.soundManager.register("start", "/game/arrow/sounds/start.wav");
    this.soundManager.register("dead", "/game/arrow/sounds/dead.wav");
    this.soundManager.register("phew", "/game/arrow/sounds/phew.wav", 0.3);
    this.soundManager.register("discharge", "/game/arrow/sounds/discharge.wav");
    this.soundManager.register("discharge_available", "/game/arrow/sounds/discharge_available.wav");
    this.soundManager.register("charge_start", "/game/arrow/sounds/charge_start.wav");
    this.soundManager.register("charge_complete", "/game/arrow/sounds/charge_complete.wav");
    this.soundManager.register("high_score", "/game/arrow/sounds/high_score.wav");
  }
}

export default ArrowLogic;