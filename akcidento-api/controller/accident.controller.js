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
exports.findAll = (req, res) => {
    Accident.findAll().then((accidents) => {
        res.send(accidents);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};

// Find an Accident by Id
exports.findById = (req, res) => {
    Accident.findById(req.params.accidentId).then((accident) => {
        res.send(accident);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};
