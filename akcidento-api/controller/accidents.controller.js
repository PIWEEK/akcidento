const db = require('../config/db.config.js');
const accidentsBySexSect = db.accidents_by_sexsect;
const accidentsByContract = db.accidents_by_contract;

exports.handleRequest = (req, res) => {
    const criteria = req.params.criteria;

    const queryBySexSect = ['sex', 'sector', 'sexsect'];
    const queryByContract = ['contract', 'modality', 'conmod'];

    const queryBuilder = ((table, options) => {
        table.findAll(options).then((accidents) => {
            res.send(accidents);
        }).catch((err) => {
            res.status(500).send("Error -> " + err);
        })
    })

    let options, model;

    if (queryBySexSect.includes(criteria)) {
        let attr = [
            [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
            'year',
            [db.sequelize.col(`${criteria}_id`), `${criteria}`]
        ]
        
        let group = [`${criteria}_id`, 'year'];
        if (criteria === 'sexsect') {
            group = ['sex_id', 'sector_id', 'year'];
            attr = [
                [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
                'year',
                'sex_id',
                'sector_id'
            ]
        }

        options = {
            attributes: [
                ...attr,
            ],
            group: group,
            order: ['year']
        }
        model = accidentsBySexSect;
    } else if (queryByContract.includes(criteria)) {
        let attr = [
            [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
            'year',
            [db.sequelize.col(`${criteria}_id`), `${criteria}`]
        ]
        
        let group = [`${criteria}_id`, 'year'];
        if (criteria === 'conmod') {
            group = ['contract_type_id', 'modality_id', 'year'];
            attr = [
                [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
                'year',
                'contract_type_id',
                'sectmodality_idor_id'
            ]
        }

        options = {
            attributes: [
                ...attr,
            ],
            group: group,
            order: ['year']
        }
        model = accidentsByContract;
    }
    queryBuilder(model, options);

    
};