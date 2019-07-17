const db = require('../config/db.config.js');
const accidentsBySexSect = db.accidents_by_sexsect;
const accidentsByContract = db.accidents_by_contract;

exports.handleRequest = (req, res) => {
    const criteria = req.params.criteria;
    const IdFilter = req.query.id;
    const sectorFilter = req.query.sector;
    const modalityFilter = req.query.modality;

    const queryBySexSect = ['sex', 'sector', 'sexsect'];
    const queryByContract = ['contract', 'modality', 'conmod'];

    const queryBuilder = ((table, options) => {
        table.findAll(options).then((accidents) => {
            res.send(accidents);
        }).catch((err) => {
            res.status(500).send("Error -> " + err);
        })
    })

    let options, model, attr, group, filter = {};

    if (queryBySexSect.includes(criteria)) {
        attr = [
            [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
            'year',
            [`${criteria}_id`, `${criteria}`]
        ]
        group = [`${criteria}_id`, 'year'];

        if (!!req.query.sex) filter.sex_id = req.query.sex;
        if (!!req.query.sector) filter.sector_id = req.query.sector;

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
        attr = [
            [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
            'year',
            [`${criteria}_id`, `${criteria}`]
        ]
        group = [`${criteria}_id`, 'year'];
        filter = {
            'modality_id': req.query.modality,
            'type_of_contract_id': req.query.type_of_contract
        };

        if (!!req.query.modality) filter.modality_id = req.query.modality;
        if (!!req.query.type_of_contract) filter.type_of_contract_id = req.query.type_of_contract;

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
        where: filter
    }
    queryBuilder(model, options);

    
};