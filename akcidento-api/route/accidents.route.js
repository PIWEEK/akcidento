module.exports = function(app) {

    const accidentsController = require('../controller/accidents.controller.js');

    // app.get('/', (req, res) => {
    //     res.json({
    //         info: 'Node.js, Express, and Postgres API'
    //     })
    // });
 
    // Create a new accident
    // app.post('/api/accidents', accidents.create);
 
    // // Retrieve all Accidents
    app.get('/api/accidents/:criteria', accidentsController.handleRequest);
 
    // // Retrieve a single Accident by Id
    // app.get('/api/accidents/by-contract/:accidentId', accidents.findById);

    // // Retrieve accidents by contract type Id
    // app.get('/api/accidents/by-contract/:contractTypeId', accidents.findByContractType);
 
    // // Retrieve accidents by contract type Id
    // app.get('/api/accidents/by-modality/:modalityId', accidents.findByModality);
 
    // // Update a accident with Id
    // app.put('/api/accident/:accidentId', accident.update);
 
    // // Delete a accident with Id
    // app.delete('/api/accident/:accidentId', accident.delete);
}