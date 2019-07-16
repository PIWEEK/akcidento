const db = require('../config/db.config.js');
const ContractType = db.contract_type;

exports.createContractType = (name) => {
    return ContractType.create({
        name
    })
}

exports.getContractTypeByName = (name) => {
    ContractType.findOne({
        where: {
          name: name
        }
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

// FETCH all contract types
exports.findAll = (req, res) => {
    ContractType.findAll().then((contractType) => {
        res.send(contractType);
    }).catch((err) => {
        res.status(500).send("Error -> " + err);
    })
};

// Find an contractType by Id
exports.findById = (req, res) => {
    ContractType.findById(req.params.contractTypeId).then((contractType) => {
        res.send(contractType);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

// Update a contract type
exports.update = (req, res) => {
    // var contractType = req.body;
    const id = req.params.contractTypeId;
    ContractType.update({
        name: req.body.name,
    },
    {
        where: {
            id: id
        } 
    }).then((contractType) => {
        res.status(200).send(contractType);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

// Delete a contract type by Id
exports.delete = (req, res) => {
    const id = req.params.contractTypeId;
    ContractType.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('Contract Type has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};
