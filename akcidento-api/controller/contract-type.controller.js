const db = require('../config/db.config.js');
const ContractType = db.contract_type;

exports.createContractType = (name) => {
    return ContractType.create({
        name
    })
}

exports.create = (req, res) => {
    createContractType(req.body.name)
    .then((contractType) => {
        res.send(contractType);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};


exports.findAll = (req, res) => {
    ContractType.findAll().then((contractType) => {
        res.send(contractType);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};
