const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {
    'Sequelize': Sequelize,
    'sequelize': sequelize,
    'accidents_by_contract': require('../model/accidents_by_contract.model.js')(sequelize, Sequelize),
    'accidents_by_sexsect': require('../model/accidents_by_sexsect.model.js')(sequelize, Sequelize),
    'contract_type': require('../model/contract-type.model.js')(sequelize, Sequelize),
    'modality': require('../model/modality.model.js')(sequelize, Sequelize),
    'sector': require('../model/sector.model.js')(sequelize, Sequelize),
    'sex': require('../model/sex.model.js')(sequelize, Sequelize),
    'province': require('../model/province.model.js')(sequelize, Sequelize),
};

db.accidents_by_contract.belongsTo(db.contract_type);
db.accidents_by_contract.belongsTo(db.modality);

db.accidents_by_sexsect.belongsTo(db.sex);
db.accidents_by_sexsect.belongsTo(db.sector);

module.exports = db;