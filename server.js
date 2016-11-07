var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
  id: 1,
  description: "go to atm",
  completed: false
}, {
  id: 2,
  description: "get haircut",
  completed: false
}, {
  id: 3,
  description: "study node/js",
  completed: true
}];

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
  //
});


app.listen(PORT, function() {
  console.log("express listening on port"+ PORT);
});
