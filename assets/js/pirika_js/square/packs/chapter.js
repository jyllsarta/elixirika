let master = require("../masterdata/chapters.js")

module.exports = class Chapter {
  constructor(){
    this.idTable = this.getAll().reduce((iter, x)=>{iter[x.id]=x; return iter}, {});
  }

  getAll(){
    return master;
  }

  getById(chapterId){
    return this.idTable[chapterId];
  }

  getByCharacterId(characterId){
    return this.getAll().filter(x=>x.character_id===characterId);
  }
};
