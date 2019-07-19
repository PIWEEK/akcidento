const db = require('../config/db.config.js');
const Sex = db.sex;

exports.createSex = (name) => {
    return Sex.create({
        name
    });
}

exports.create = (req, res) => {
    createSex(req.body.name)
    .then((sector) => {
        res.send(sex);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};

// FETCH all sectors
exports.findAll = (req, res) => {
    Sex.findAll().then((sex) => {
        res.send(sex);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};
