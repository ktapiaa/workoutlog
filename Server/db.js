const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-walkthrough', 
'postgres', 'password',{
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to workout-walkthrough postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports= sequelize;