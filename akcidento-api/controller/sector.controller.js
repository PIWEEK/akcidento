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

// // Find a contract modality by Id
// exports.findById = (req, res) => {
//     Modality.findByPk(req.params.modalityId).then((modality) => {
//         res.send(modality);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Update a contract modality type
// exports.update = (req, res) => {
//     // var modality = req.body;
//     const id = req.params.modalityId;
//     Modality.update({
//         name: req.body.name,
//     },
//     {
//         where: {
//             id: id
//         } 
//     }).then((modality) => {
//         res.status(200).send(modality);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Delete a contract modality type by Id
// exports.delete = (req, res) => {
//     const id = req.params.modalityId;
//     Modality.destroy({
//         where: { id: id }
//     }).then(() => {
//         res.status(200).send('Contract modality has been deleted!');
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     });
// };
