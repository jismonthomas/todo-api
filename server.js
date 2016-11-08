var express = require("express");
var bodyParser = require('body-parser');
var _ = require("underscore");
var hbs = require('hbs');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/',function(req, res){
  res.render('home.hbs',{
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to the website",
    currentYear: new Date().getFullYear()
  });
});

//get /todos
app.get('/todos',function(req, res){
  res.json(todos);
});
//get /todos/:id

app.get('/todos/:id',function(req, res){
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});

  // var matchedItem;
  // todos.forEach(function(todo){
  //   if(todo.id == todoId) {
  //     matchedItem = todo.id;
  //     res.json(todo);
  //   }
  // });

  if(matchedTodo) {
    res.json(matchedTodo);
  }
  else {
    res.status(404).send();
  }

  // if (typeof matchedItem === "undefined") {
  //   res.status(404).send();
  //   //res.send("not found");
  // }
});

app.post('/todos',function(req, res) {
  var body = req.body;

  if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
    return res.status(404).send();
  }

  body.id = todoNextId;
  todoNextId++;

  todos.push(body);
  console.log("description "+body.description);

  res.send(body);
});

app.get('/about', function(req, res) {
  res.render('about.hbs', {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
});
app.listen(PORT, function() {
  console.log("express listening on port"+ PORT);
});
