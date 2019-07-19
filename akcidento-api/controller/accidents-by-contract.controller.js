const db = require('../config/db.config.js');
const AccidentsByContract = db.accidents_by_contract;

exports.createAccidentsByContract = (year, contractTypeId, modalityId, total) => {
    AccidentsByContract.create({
        year,
        contractTypeId,
        modalityId,
        total
    })
}

exports.create = (req, res) => {
    createAccidentsByContract(
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
