const express = require("express");
const axios = require("axios");
const { match } = require("assert");
// const { findSourceMap } = require("module");
const PORT = 8000;
let db = [];
let nextId = 2347;

// instantiate the application
let app = express();

// allow app to parse json in the request body
app.use(express.json());

//GET the full list of todos
app.get("/todos", function (req, res) {
  res.json(db);
});

// Get the full details of a task by ID
app.get("/todos/:id", function (req, res) {
  let id = req.params.id;
  let matchingItem;
  for (let i = 0; i < db.length; i++) {
    let entry = db[i];
    if (entry.id == id) {
      matchingItem = entry;
      break;
    }
  }
  res.json(matchingItem);
});

// delete a specific task with an id
// return ok message
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

// POST /todos
// Add an item to the database
// request body looks like this
/*
{
  task: "stuff",
  description: "stuff"
  done: "true"
}
*/

// Statuses:
// 200's = GOOD
// 300's = The thing you want isn't here
// 400's = You screwed up as the client, or you aren't authorized
// 500's = Something went wrong, servers fault

app.post("/todos", function (req, res) {
  let payload = req.body;
  let task = payload.task;
  let description = payload.description;
  let id = nextId;
  nextId++;
  let element = {
    id: id,
    task: task,
    description: description,
    done: false,
  };
  db.push(element);
  res.sendStatus(204); //basically a thumbs up
});

// PUT /todos/:id
// update an item in the task list

app.put("/todos/:id", function (req, res) {
  let id = req.params.id;
  let matchingItem;

  for (let i = 0; db.length; i++) {
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

// make the application listen at port 8000
app.listen(PORT, function (req, res) {
  console.log("App started on port: ", PORT);
});
