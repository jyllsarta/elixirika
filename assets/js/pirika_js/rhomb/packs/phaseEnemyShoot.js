module.exports = class PhaseEnemyShoot {
  constructor(){
    this.name = "ENEMY_SHOOT";
  }

 enter(model){
    console.log("enemy shoot Phase!");
    model.turn++;
    model.bullets = model.bullets.concat(this.bulletsOfTurn(model.turn, model));
  }

  bulletsOfTurn(turn, model){
    const bullet_ids = model.masterdata.getOne("turns", "turn", turn).bullet_ids;
    return model.masterdata.getBy("bullets", "id", bullet_ids);
  }
};
