const ContractType = require('./contract-type.model.js');
const Modality = require('./modality.model.js');

module.exports = (sequelize, Sequelize) => {

    const Model = Sequelize.Model;

    class AccidentsByContractType extends Model {}
    AccidentsByContractType.init({
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notNull: {
                msg: 'Please enter the year of this data'
            }
        },
        total: {
            type: Sequelize.REAL,
            allowNull: false,
            notNull: {
                msg: 'Please enter a total value'
            },
        }
    }, {
        sequelize,
        underscored: true,
        modelName: 'accidents_by_contract'
    });

    return AccidentsByContractType;
}
