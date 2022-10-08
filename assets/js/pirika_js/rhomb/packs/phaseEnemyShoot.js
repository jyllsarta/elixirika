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
    const bullet_ids = model.masterdata.getOne("turns", "turn", turn).bullet_ids;
    const bullets = model.masterdata.getBy("bullets", "id", bullet_ids);
    return bullets.map((bullet)=>new Bullet(bullet));
  }
};
