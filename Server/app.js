require("dotenv").config();
let express = require ('express');
let app = express();
let sequelize = require('./db');

let workout = require('./controllers/workoutcontroller');
let user = require('./controllers/usercontroller');


sequelize.sync();

app.use(express.json());
//Exposed route
app.use('/user', user);

//Protected Route
app.use(require('./middleware/validate-session'));
app.use('/log', workout);


app.listen(3000, function(){
    console.log('App is listening on port 3000')
})