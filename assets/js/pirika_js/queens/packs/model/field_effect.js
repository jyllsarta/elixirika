import FieldEffectCharacter1 from "../service/field_effect/character1.js";
import FieldEffectCharacter2 from "../service/field_effect/character2.js";
import FieldEffectCharacter99 from "../service/field_effect/character99.js";
import Masterdata from "../masterdata.js";

export class FieldEffect {
  constructor(id){
    this.id = id;
    this.restCount = 0;
    this.master = Masterdata.get("field_effects", id);
  }

  asModule(){
    switch(this.id){
      case 1:
        return new FieldEffectCharacter1();
      case 2:
        return new FieldEffectCharacter2();  
      case 99:
        return new FieldEffectCharacter99();
      default:
        console.warn("unknown Field Effect: ", this.id);
        return null;
    }
  }
};
export default FieldEffect;
