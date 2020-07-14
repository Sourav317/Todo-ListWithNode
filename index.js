const express = require('express');
const mongoose = require('mongoose');
const port = 5000;
const bodyParser = require('body-parser');

const db = require('./config/mongoose');
const todo_desc = require('./models/todo_schema');
const app = express();

//  setting the connection to ejs files
app.set('view engine','ejs');
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({extended : true}));

// creating an array of todo for storing items from user
// var TodoList = [
//     "buying an icecream",
//     "surfing internet"
// ]

//      Express Routes Here
//  connecting to views>index.ejs file   Default Route
app.get("/",function(req,res){
    todo_desc.find({}, function(err, newtodo){
        if(err){
            console.log('Error in fetching');
            return;
        }
        return res.render('index', {
            todo_desc: newtodo
        });
    });
});

//  for creating a new todo item
app.post("/new_todo",function(req,res){
    console.log("item submitted");
    //var item = req.body.item;
    //var date = req.body.date;
    //var cate = req.body.category;

    todo_desc.create({
        name: req.body.name,
        date: req.body.date,
        category: req.body.category
       // category: req.body.category,
        //date: req.body.date
        //instead of newtodo can give any name
    },function(err,newtodo){
        if(err){
            console.log('ERROR');
    return ;}
        console.log('******',newtodo);
        return res.redirect('back');
    });
});

//for deleting a todo item
app.get('/delete_list', function(req,res){
    //console.log(req.params)
    // let desc = req.query.desc;
    let id = req.query.id;

    todo_desc.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting');
            return;
        }

        return res.redirect('back');
    });
   /* let listIndex = tododisc.findIndex(tododisc => tododisc.desc == desc);

    if(listIndex != -1){
        tododisc.splice(listIndex, 1);
    }
    return res.redirect('back');*/
});

//  for invalid pages thats not been set
app.get("*",function(req,res){
    res.send('<h1> Invalid page </h1>');
});

app.listen(port,function(err){
    if(err)
    console.log("There is an error in the server i.e., ",err);
    else
    console.log("servers is up and running on ",port);
});
