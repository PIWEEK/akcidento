const db = require('../config/db.config.js');
const accidentsBySexSect = db.accidents_by_sexsect;
const accidentsByContract = db.accidents_by_contract;

exports.handleRequest = (req, res) => {
    let criteria = req.params.criteria;

    const queryBySexSect = ['sex', 'sector', 'sexsect'];
    const queryByContract = ['type_of_contract', 'modality', 'conmod'];

    const queryBuilder = ((table, options) => {
        table.findAll(options).then((accidents) => {
            res.send(accidents);
        }).catch((err) => {
            res.status(500).send("Error -> " + err);
        })
    })

    let options, model, attr, group, include;
    let filter = {};

    if (queryBySexSect.includes(criteria)) {
        // Attr definition
        attr = [
            [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
            'year',
        ]

        // Group by definition
        group = [
            'year',
            db.sequelize.col(`${criteria}.id`)
        ];

        // Filter definition
        if (!!req.query.sex) filter.sex_id = req.query.sex;
        if (!!req.query.sector) filter.sector_id = req.query.sector;
        if (!!req.query.year) filter.year = req.query.year;

        // Include definition
        include = [
            {
                model: db[criteria],
                attributes: ['id', 'name']
            },
        ]

        // Multiselector definition
        if (criteria === 'sexsect') {
            group = [
                'year',
                db.sequelize.col('sex.id'),
                db.sequelize.col('sector.id')
            ];
            attr = [
                [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
                'year',
            ]
            include = [
                {
                    model: db.sex,
                    attributes: ['id', 'name']
                },
                {
                    model: db.sector,
                    attributes: ['id', 'name']
                },
            ]
        }

        //Model definition
        model = accidentsBySexSect;

    } else if (queryByContract.includes(criteria)) {

        criteria = criteria === 'contract_type' ? 'type_of_contract': 'modality';

        // Attr definition
        attr = [
            [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
            'year',
        ]

        // Group by definition
        group = [
            'year',
            db.sequelize.col(`${criteria}.id`)
        ];

        // Filter definition
        if (!!req.query.modality) filter.modality = req.query.modality;
        if (!!req.query.type_of_contract) filter.type_of_contract_id = req.query.type_of_contract;
        if (!!req.query.year) filter.year = req.query.year;

        include = [
            {
                model: db[criteria],
                attributes: ['id', 'name']
            },
        ]


        // Multiselector definition
        if (criteria === 'conmod') {
            group = [
                'year',
                db.sequelize.col('contract_type.id'),
                db.sequelize.col('modality.id')
            ];
            attr = [
                [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
                'year',
            ]
            include = [
                {
                    model: db.contract_type,
                    attributes: ['id', 'name']
                },
                {
                    model: db.modality,
                    attributes: ['id', 'name']
                },
            ]
        }

        model = accidentsByContract;
    }
    options = {
        attributes: attr,
        group,
        order: group,
        where: filter,
        include
    }
    
    queryBuilder(model, options);


};