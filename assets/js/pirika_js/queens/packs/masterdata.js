class Masterdata {
  constructor() {
    const titles = ["scripts", "characters", "field_effects"];
    this.master = this.loadMasterData(titles);
    this.idTables = this.constructIdTables(titles, this.master);
  }

  getAll(title) {
    return this.master[title];
  }

  getBy(title, key, ids) {
    return this.master[title].filter((record) => ids.includes(record[key]));
  }

  getOne(title, key, id) {
    return this.master[title].find((record) => record[key] === id);
  }

  // private

  loadMasterData(titles) {
    let master = {};
    for (let title of titles) {
      let masterdata = require(`../masterdata/${title}.js`);
      master[title] = masterdata;
    }
    return master;
  }

  constructIdTables(titles, loadedMaster) {
    let idTables = {};
    for (let title of titles) {
      idTables[title] = loadedMaster[title].reduce((iter, x) => {
        iter[x.id] = x;
        return iter;
      }, {});
    }
    return idTables;
  }
};

module.exports = new Masterdata();