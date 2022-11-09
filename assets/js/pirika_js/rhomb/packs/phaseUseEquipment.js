const Bullet = require("./bullet");

module.exports = class PhaseUseEquipment {
  constructor(){
    this.name = "USE_EQUIPMENT";
    this.equipmentId = null;
  }

  nextPhaseName(model){
    return "MAIN";
  }

  enter(model){
    console.log("use equip Phase!");
  }

  embedEquipmentId(equipmentId){
    this.equipmentId = equipmentId;
  }

  handleMouseUp(e, model){
    const equipment = model.equipments.find(equipment=>equipment.id === this.equipmentId);
    for(let bullet_alignment of equipment.bullet_alignments){
      let bullet = new Bullet(model.masterdata.idTables.bullets[bullet_alignment.bullet_id]);
      bullet.x = e.offsetX + bullet_alignment.x;
      bullet.y = e.offsetY + bullet_alignment.y;
      model.bullets.push(bullet);
    }
    model.tp -= equipment.tp;
    equipment.tp += equipment.tp_gain;
    model.phaseStateMachine.transferToNextPhase(model);
  }
};
