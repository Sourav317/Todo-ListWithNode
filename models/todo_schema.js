//creating schema for db 
const mongoose = require('mongoose');

const mongo_schema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
   date:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    }
});

const todo_desc = mongoose.model('todo_desc',mongo_schema);

module.exports = todo_desc;