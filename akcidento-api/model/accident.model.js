const ContractType = require('../model/contract-type.model');
const Modality = require('../model/modality.model');

module.exports = (sequelize, Sequelize) => {
    const Accident = sequelize.define('accident', {
        year: {
            type: Sequelize.NUMBER,
            allowNull: false,
            notNull: {
                msg: 'Please enter the year of this data'
            }
        },
        contractType_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notNull: {
                msg: 'Please enter a contract type'
            },

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
            notNull: {
                msg: 'Please enter a contract modality'
            },

            references: {
                // This is a reference to another model
                model: Modality,

                // This is the column name of the referenced model
                key: 'id',

                // This declares when to check the foreign key constraint. PostgreSQL only.
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        total: {
            type: Sequelize.NUMBER,
            allowNull: false,
            notNull: {
                msg: 'Please enter a total value'
            },
        }
    });
    
    return Accident;
}
