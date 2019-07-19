const db = require('../config/db.config.js');
const AccidentsBySexSect = db.accidents_by_sexsect;

exports.createAccidentsBySexSect = (year, sexId, sectorId, total) => {
    AccidentsBySexSect.create({
        year,
        sexId,
        sectorId,
        total
    })
}

exports.create = (req, res) => {
    createAccidentsBySexSect(
        req.body.year,
        req.body.sexId,
        req.body.sectorId,
        req.body.total,
    )
    .then((accident) => {
        res.send(accident);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};
