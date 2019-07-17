const db = require('../config/db.config.js');
const AccidentsBySexSect = db.accidents_by_sexsect;
const AccidentsByContract = db.accidents_by_contract;

exports.handleRequest = (req, res) => {
    const criteria = req.params.groupCriteria;
    AccidentsByContract.findAll({
        attributes: [
            [db.sequelize.fn('SUM', db.sequelize.col('total')), 'total'],
            'year',
            'modality_id',
        ],
        group: ['year', criteria],
        order: ['year', criteria]
    }).then((accidents) => {
        res.send(accidents);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};