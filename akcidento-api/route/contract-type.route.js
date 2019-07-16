module.exports = function(app) {

    const contractTypes = require('../controller/contract-type.controller.js');

    // Create a new accident
    // app.post('/api/contract-types', contractTypes.create);
 
    // // Retrieve all Accidents
    app.get('/api/contract-types', contractTypes.findAll);
 
    // Retrieve a single Accident by Id
    // app.get('/api/contract-types/:contractTypeId', contractTypes.findById);
 
    // // Update a accident with Id
    // app.put('/api/contract-types/:contractTypeId', contractTypes.update);

    // // Delete a accident with Id
    // app.delete('/api/contract-types/:contractTypeId', contractTypes.delete);
}