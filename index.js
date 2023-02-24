// Add Express
const express = require("express");
const EventEmitter = require("events");

// Initialize Express
const app = express();
app.use(express.urlencoded());
const emitter = new EventEmitter();

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.post("/authenticate", (req, res) => {
  const unity_deviceId = req.body.deviceId;
  console.log(unity_deviceId);

  emitter.on("logged-in", (web_deviceId) => {
      if (web_deviceId === unity_deviceId) {
          res.send("OK");
      }
  })
})

app.post("/login_success", (req, res) => {
  console.log(req.body.deviceId);
  emitter.emit("logged-in", req.body.deviceId);
  res.send("OK");
})

// Initialize server
app.listen(3000, () => {
  console.log("Running on port 3000.");
});

// Export the Express API
module.exports = app;