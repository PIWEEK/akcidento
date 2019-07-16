const db = require('../config/db.config.js');
const Accident = db.accidents;

exports.createAccident = (year, contractTypeId, modalityId, total) => {
    Accident.create({
        year: year,
        contract_type_id: contractTypeId,
        modality_id: modalityId,
        total: total
    })
}

exports.create = (req, res) => {
    createAccident(
        req.body.year,
        req.body.contract_type_id,
        req.body.modality_id,
        req.body.total,
    )
    .then((accident) => {
        res.send(accident);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};

// FETCH all accidents
exports.handleRequest = (req, res) => {
    const criteria = req.params.groupCriteria;
    // const source = criteria === 'modality_id' || 'contract_types' ? db.accidents : db.accidents;
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', criteria, source);
    Accident.findAll({
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

// // Find an Accident by Id
// exports.findById = (req, res) => {
//     Accident.findByPk(req.params.accidentId).then((accident) => {
//         res.send(accident);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// exports.findByContractType = (req, res) => {
//     Accident.findAll({
//         where: {
//           contract_type_id: req.params.contractTypeId
//         }
//     }).then((accident) => {
//         res.send(accident);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// exports.findByModality = (req, res) => {
//     Accident.findAll({
//         where: {
//           modality_id: req.params.contractTypeId
//         }
//     }).then((accident) => {
//         res.send(accident);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };
