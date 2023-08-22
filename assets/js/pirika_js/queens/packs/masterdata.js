class Masterdata {
  constructor() {
    const titles = [
      "scripts",
      "characters",
      "field_effects",
      "quests",
      "scenes",
      "skills",
      "buffs",
      "break_conditions",
      "shop_items",
      "equipments",
      "character_scripts",
    ];
    this.master = this.loadMasterData(titles);
    this.idTables = this.constructIdTables(titles, this.master);
    this.ready = true;
  }

  get(title, id) {
    return this.idTables[title][id];
  }

  getAll(title) {
    return this.master[title];
  }

  getAllMap(title) {
    return this.idTables[title];
  }

  getBy(title, key, ids) {
    return this.master[title].filter((record) => ids.includes(record[key]));
  }

  // condition: {key: value}
  getByCondition(title, condition) {
    return this.master[title].filter((record) => {
      for (let key in condition) {
        if (record[key] !== condition[key]) {
          return false;
        }
      }
      return true;
    });
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
