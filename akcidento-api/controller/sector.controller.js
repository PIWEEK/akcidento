const db = require('../config/db.config.js');
const Sector = db.sector;

exports.createSector = (name) => {
    return Sector.create({
        name
    });
}

exports.create = (req, res) => {
    createSector(req.body.name)
    .then((sector) => {
        res.send(sector);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};

// FETCH all sectors
exports.findAll = (req, res) => {
    Sector.findAll().then((sector) => {
        res.send(sector);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};
