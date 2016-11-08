var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/',function(req, res){
  res.send('Todo api Root');
});

//get /todos
app.get('/todos',function(req, res){
  res.json(todos);
});
//get /todos/:id

app.get('/todos/:id',function(req, res){
  var todoId = req.params.id;
  var matchedItem;
  todos.forEach(function(todo){
    if(todo.id == todoId) {
      matchedItem = todo.id;
      res.json(todo);
    }
  });
  if (typeof matchedItem === "undefined") {
    res.status(404).send();
    //res.send("not found");
  }
});

app.post('/todos',function(req, res) {
  var body = req.body;

  body.id = todoNextId;
  todoNextId++;

  todos.push(body);
  console.log("description "+body.description);

  res.send(body);
});

app.listen(PORT, function() {
  console.log("express listening on port"+ PORT);
});
