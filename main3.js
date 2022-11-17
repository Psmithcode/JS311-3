const { json } = require("body-parser");
const express = require("express");
let app = express();
let PORT = 8000;
let db = [];
let nextId = 1;
app.use(express.json());

app.listen(PORT, function () {
  console.log("Application started on port:", PORT);
});

app.get("/todos", function (req, res) {
  res.send(db);
});

app.get("/todos/:id", function (req, res) {
  let matchingItem;
  let id = req.params.id;
  for (let i = 0; i < db.length; i++) {
    if (db[i].id == id) {
      matchingItem = db[i];
      break;
    }
  }
  res.send(matchingItem);
});

app.post("/todos", function (req, res) {
  let task = req.body.task;
  let description = req.body.description;
  let id = nextId;
  nextId++;
  const element = {
    id: id,
    task: task,
    description: description,
    done: false,
  };
  db.push(element);
  res.sendStatus(204);
});

app.delete("/todos/:id", function (req, res) {
  id = req.params.id;
  for (let i = 0; i < db.length; i++) {
    if ((id = db[i].id)) {
      db.splice(i, 1);
      break;
    }
  }
  res.sendStatus(204);
});

app.put("/todos/:id", function (req, res) {
  let id = req.params.id;
  let matchingItem;
  for (let i = 0; i < db.length; i++) {
    if (id == db[i].id) {
      matchingItem = db[i];
      break;
    }
  }
  if (matchingItem) {
    matchingItem.task = req.body.task;
    matchingItem.description = req.body.description;
    matchingItem.done = req.body.done == true;
  }
  res.sendStatus(204);
});
