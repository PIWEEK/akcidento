const db = require('../config/db.config.js');
const Accident = db.accident;

// exports.create = (req, res) => {
//     Accident.create({
//         name: req.body.name,
//         age: req.body.age
//     }).then((accident) => {
//         res.send(accident);
//     }).catch((err) => {
//         res.status(500).send("Error -> " + err);
//     })
// };

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
    Accident.findById(req.params.accidentId).then((accident) => {
        res.send(accident);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

// // Update a User
// exports.update = (req, res) => {
//     var user = req.body;
//     const id = req.params.userId;
//     User.update({
//         name: req.body.name,
//         email: req.body.name
//     },
//     {
//         where: {
//             id: id
//         } 
//     }).then(() => {
//         res.status(200).send(user);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
// };

// // Delete a User by Id
// exports.delete = (req, res) => {
//     const id = req.params.userId;
//     User.destroy({
//         where: { id: id }
//     }).then(() => {
//         res.status(200).send('User has been deleted!');
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     });
// };
