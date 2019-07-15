module.exports = function(app) {

    const accidents = require('../controller/accident.controller.js');

    app.get('/', (req, res) => {
        res.json({
            info: 'Node.js, Express, and Postgres API'
        })
    });
 
    // Create a new accident
    app.post('/api/accident', accidents.create);
 
    // // Retrieve all Accidents
    app.get('/api/accidents', accidents.findAll);
 
    // Retrieve a single Accident by Id
    app.get('/api/accident/:accidentId', accidents.findById);
 
    // // Update a accident with Id
    // app.put('/api/accident/:accidentId', accident.update);
 
    // // Delete a accident with Id
    // app.delete('/api/accident/:accidentId', accident.delete);
}