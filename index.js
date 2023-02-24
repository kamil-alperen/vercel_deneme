// Add Express
const express = require("express");
const EventEmitter = require("events");
const path = require("path");

const emitter = new EventEmitter();

// Initialize Express
const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.post("/authenticate", (req, res) => {
  //const unity_deviceId = req.body.deviceId;
  console.log("Unity : ");
  //console.log(unity_deviceId);
  console.log(req);
  console.log(res);

  /* emitter.on("logged-in", (web_deviceId) => {
      if (web_deviceId === unity_deviceId) {
          res.send("OK");
      }
  }) */
})

/* app.post("/login_success", (req, res) => {
  console.log("Web : ");
  console.log(req.body.deviceId);
  emitter.emit("logged-in", req.body.deviceId);
  res.send("OK");
}) */

// Initialize server
app.listen(3000, () => {
  console.log("Running on port 3000.");
});

// Export the Express API
module.exports = app;