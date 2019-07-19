const db = require('../config/db.config.js');
const Province = db.province;

exports.createProvince = (name, region) => {
    return Province.create({
        name,
        region
    });
}

exports.create = (req, res) => {
    create(req.body.name, req.body.region)
    .then((province) => {
        res.send(province);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};

// FETCH all sectors
exports.findAll = (req, res) => {
    Province.findAll().then((province) => {
        res.send(province);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};
