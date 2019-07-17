const db = require('../config/db.config.js');
const accidentsBySexSect = db.accidents_by_sexsect;
const accidentsByContract = db.accidents_by_contract;

exports.handleRequest = (req, res) => {
    const criteria = req.params.groupCriteria;

    const queryBySexSect = ['sex', 'sector'];
    const queryByContract = ['contract-type', 'modality'];

    const queryBuilder = ((table, options) => {
        table.findAll(options).then((accidents) => {
            res.send(accidents);
        }).catch((err) => {
            res.status(500).send("Error -> " + err);
        })
    })

    if (queryBySexSect.includes(criteria)) {
        const options = {
            attributes: [
                [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
                'year',
                'sex_id',
                'sector_id',
            ],
            group: ['year', criteria],
            order: ['year', criteria, 'sector_id', 'sex_id']
        }
        queryBuilder(accidentsBySexSect, options);
    } else if (queryByqueryByContractSexSect.includes(criteria)) {
        const options = {
            attributes: [
                [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
                'year',
                'contract_type_id',
                'modality_id',
            ],
            group: ['year', criteria],
            order: ['year', criteria]
        }
        queryBuilder(accidentsByContract, options);
    }

    
};