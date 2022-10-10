const Bullet = require("./bullet");

module.exports = class PhaseEnemyShoot {
  constructor(){
    this.name = "ENEMY_SHOOT";
  }

  nextPhaseName(model){
    return "MAIN";
  }

 enter(model){
    console.log("enemy shoot Phase!");
    model.turn++;
    model.bullets = model.bullets.concat(this.bulletsOfTurn(model.turn, model));
    model.tick = 0;
  }

  bulletsOfTurn(turn, model){
    // 将来的には turns 全体を舐めるんじゃなくてエネミー単位でとる
    const totalTurnCount = model.masterdata.master.turns.length;
    const turnToReference = turn % totalTurnCount + 1;

    const bullet_ids = model.masterdata.getOne("turns", "turn", turnToReference).bullet_ids;
    const bullets = model.masterdata.getBy("bullets", "id", bullet_ids);
    return bullets.map((bullet)=>new Bullet(bullet));
  }
};
