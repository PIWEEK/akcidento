module.exports = function(app) {

    const contractTypes = require('../controller/contract-type.controller.js');

    app.get('/', (req, res) => {
        res.json({
            info: 'Node.js, Express, and Postgres API'
        })
    });
 
    // Create a new accident
    app.post('/api/contract-type', contractTypes.create);
 
    // // Retrieve all Accidents
    app.get('/api/contract-type', contractTypes.findAll);
 
    // Retrieve a single Accident by Id
    app.get('/api/contract-type/:contractTypeId', contractTypes.findById);
 
    // // Update a accident with Id
    app.put('/api/contract-type/:contractTypeId', contractTypes.update);

    // // Delete a accident with Id
    app.delete('/api/contract-type/:contractTypeId', contractTypes.delete);
}