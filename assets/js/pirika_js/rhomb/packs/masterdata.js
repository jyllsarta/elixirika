module.exports = class Masterdata {
  constructor(){
    const titles = ["bullets", "turns"];
    this.master = this.loadMasterData(titles);
    this.idTables = this.constructIdTables(titles, this.master);
  }

  getAll(title){
    return this.master[title];
  }

  // private

  loadMasterData(titles){
    let master = {};
    for(let title of titles){
      let masterdata = require(`../masterdata/${title}.js`);
      master[title] = masterdata;
    }
    return master;
  }

  constructIdTables(titles, loadedMaster){
    let idTables = {};
    for(let title of titles){
      idTables[title] = loadedMaster[title].reduce((iter, x)=>{iter[x.id]=x; return iter}, {});
    }
    return idTables;
  }
};
