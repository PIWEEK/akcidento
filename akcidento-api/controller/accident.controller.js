const db = require('../config/db.config.js');
const Accident = db.accident;

exports.create = (req, res) => {
    Accident.create({
        year: req.body.year,
        contractType_id: req.body.contractType_id,
        modality_id: req.body.modality_id,
        total: req.body.total,
    }).then((accident) => {
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
    console.log('findById');
    Accident.findById(req.params.accidentId).then((accident) => {
        res.send(accident);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};
