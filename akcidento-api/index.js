const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db.config.js');
const cors = require('cors')


const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
  
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});

require('./route/accident.route.js')(app);
require('./route/contract-type.route')(app);
require('./route/modality.route')(app);
  
// Create a Server
const server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})