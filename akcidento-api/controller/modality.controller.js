const db = require('../config/db.config.js');
const Modality = db.modality;

exports.createModality = (name) => {
    return Modality.create({
        name
    });
}

exports.create = (req, res) => {
    createModality(req.body.name)
    .then((modality) => {
        res.send(modality);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};

// FETCH all contract modality types
exports.findAll = (req, res) => {
    Modality.findAll().then((modality) => {
        res.send(modality);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};
