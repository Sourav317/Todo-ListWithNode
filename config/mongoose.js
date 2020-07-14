const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/todo_db');

//acquire connection to check if the connection is okk or not
const db = mongoose.connection;

db.on('error',console.error.bind(console,'error in connecting to db'));

//once the connection is stablished successfully
db.once('open',function(){
    console.log('Successfully connected to db');
});