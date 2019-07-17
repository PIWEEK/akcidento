const db = require('../config/db.config.js');
const accidentsBySexSect = db.accidents_by_sexsect;
const accidentsByContract = db.accidents_by_contract;

exports.handleRequest = (req, res) => {
    const criteria = req.params.criteria;
    console.log(criteria);

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
            [`${criteria}_id`, `${criteria}`]
        ]
        let group = [`${criteria}_id`, 'year'];

        if (criteria === 'sexsect') {
            group = ['year', 'sector_id', 'sex_id'];
            attr = [
                [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
                'year',
                ['sex_id', 'sex'],
                ['sector_id', 'sector']
            ]
        }
        model = accidentsBySexSect;
    } else if (queryByContract.includes(criteria)) {
        let attr = [
            [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
            'year',
            [`${criteria}_id`, `${criteria}`]
        ]
        
        let group = [`${criteria}_id`, 'year'];
        if (criteria === 'conmod') {
            group = ['year', 'contract_type_id', 'modality_id'];
            attr = [
                [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
                'year',
                ['contract_type_id', 'contract_type'],
                ['modality_id', 'modality']
            ]
        }
        model = accidentsByContract;
    }
    options = {
        attributes: attr,
        group: group,
        order: group,
    }
    queryBuilder(model, options);

    
};