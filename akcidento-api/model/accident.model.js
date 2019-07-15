const ContractType = require('../model/contract-type.model');
const Modality = require('../model/modality.model');

module.exports = (sequelize, Sequelize) => {
    const Accident = sequelize.define('accident', {
        year: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contractType_id: {
            type: Sequelize.INTEGER,
            allowNull: false,

            references: {
                // This is a reference to another model
                model: ContractType,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        modality_id: {
            type: Sequelize.INTEGER,
            allowNull: false,

            references: {
                // This is a reference to another model
                model: Modality,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        number: {
            type: Sequelize.NUMBER,
            allowNull: false
        }
    });
    
    return Accident;
}