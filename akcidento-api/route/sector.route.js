module.exports = function(app) {

    const modality = require('../controller/modality.controller.js');
 
    // Create a new modality
    // app.post('/api/modality', modality.create);
 
    // // Retrieve all modalities
    app.get('/api/modalities', modality.findAll);
 
    // Retrieve a single modality by Id
    // app.get('/api/modalities/:modalityId', modality.findById);
 
    // Update a modality with Id
    // app.put('/api/modality/:modalityId', modality.update);

    // Delete a modality with Id
    // app.delete('/api/modality/:modalityId', modality.delete);
}