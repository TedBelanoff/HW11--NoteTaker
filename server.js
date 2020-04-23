// Server design
var express = require("express");
var path = require("path");
var fs = require('fs')
var app = express();
var PORT = 3000;

// Notelist to be appended/overwritten
var notelist=[];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets/js/', express.static(__dirname + "/assets/js/"));
app.use('/assets/css/', express.static(__dirname + "/assets/css/"));
app.use('/api/notes.json', express.static(__dirname + "/api/notes.json"));
app.use(express.static('public'));

// Server launch confirmation
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

//Index Page Route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//CSS Route
app.get("/styles.css", function(req, res) {
  res.send(path.join(__dirname, "styles.css"));
});

//Notes Page Route
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// JSON File Get
app.get("/api/notes", function(req, res) {
  return res.json(notes)
});

// JSON File Post
app.post("/api/notes.json", function(req, res) {
  var newNote = req.body;
  notelist.push(newNote);
  fs.writeFileSync(path.join(__dirname,"/api/notes.json"), JSON.stringify(notelist), () => {})
  return res.sendFile(path.join(__dirname, "/api/notes.json"));
});

//JSON File Delete
app.delete("/api/notes.json", function(req, res) {
  var IDVal = req.body;
  var removalid = Object.keys(IDVal)
  var removalindex = notelist.findIndex(notelist => notelist.id === removalid[0]);
  notelist.splice( removalindex, 1 );
  fs.writeFileSync(path.join(__dirname,"/api/notes.json"), JSON.stringify(notelist), () => {})
  return res.sendFile(path.join(__dirname, "/api/notes.json"));
});