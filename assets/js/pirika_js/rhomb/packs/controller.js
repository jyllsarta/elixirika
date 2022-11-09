module.exports = class Controller {
  constructor(model) {
    this.model = model;
  }

  setTick(tick){
    this.model.tick = tick;
  }

  prepare(){
    if(this.model.isGameStarted){
      return;
    }
    const rand = Math.floor(Math.random() * 100000000);
    this.model.initialize(rand);
  }

  nextPhase(){
    this.model.nextPhase();
  }

  // TODO: この辺の処理も phaseMain の方に書ける設計になるとすごく良さそう
  equipmentMousedown(guiEvent){
    const {id} = guiEvent;
    if(!this.model.phaseStateMachine.phase === "MAIN"){
      console.log("not main phase!");
      return;
    }
    const equipment = model.equipments.find(equipment=>equipment.id === id);
    if(this.model.tp < equipment.tp){
      console.log("short of tp!");
      return;
    }
    this.model.phaseStateMachine.transferTo("USE_EQUIPMENT", model);
    this.model.phaseStateMachine.phase.embedEquipmentId(id);
  }

  // NOTE(jyllsarta): UIの自動操作とかでフェーズ内で刻んで演出を動かす場合の1tick分の操作をこれで行う。
  // ex: 敵弾幕展開フェーズで `敵が近づいてくる` → `弾を展開してラインを描画` → `メインフェイズに遷移`
  // これらのステップは実際には EnemyShoot 監視用コンポーネントが
  // タイムラインを使って PhaseEnemyShootの next() を 3 回 controller 経由で叩いている
  next(){
    this.model.phaseStateMachine.phase.next(this.model);
  }

  reset(){
    this.model.isGameStarted = false;
    this.prepare();
  }
};
