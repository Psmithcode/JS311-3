const express = require("express");
let app = express();
const PORT = 8000;
let nextId = 1;
let db = [];
app.use(express.json());

app.listen(PORT, function () {
  console.log("Application started on port, ", PORT);
});

app.post("/todos", function (req, res) {
  let body = req.body;
  let id = nextId;
  nextId++;
  let description = body.description;
  let task = body.task;
  const element = {
    id: id,
    task: task,
    description: description,
    done: false,
  };
  db.push(element);
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
    matchingItem.done = req.params.done == true;
  }
  res.sendStatus(204);
});

app.delete("/todos/:id", function (req, res) {
  let id = req.params.id;
  for (let i = 0; i < db.length; i++) {
    if (id == db[i].id) {
      db.splice(i, 1);
      break;
    }
  }
  res.sendStatus(204);
});

app.get("/todos/:id", function (req, res) {
  let id = req.params.id;
  let matchingItem;
  for (let i = 0; i < db.length; i++) {
    if (id == db[i].id) {
      matchingItem = db[i];
    }
  }
  res.send(matchingItem);
});

app.get("/todos", function (req, res) {
  res.send(db);
});
