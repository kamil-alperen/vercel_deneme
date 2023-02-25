// Add Express
const express = require("express");
const path = require("path");
const config = require("./config");
const database = require("firebase/database");
const onValue = database.onValue;
const ref = database.ref;
const db = config.db;

// Initialize Express
const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.post("/authenticate", (req, res) => {
  let unity_deviceId = req.body.deviceId;

  let response = "NO";

  let deviceIDs = null;
  onValue(ref(db, "/deviceIDs"), snapshot => {
    deviceIDs = snapshot.val();
    console.log(deviceIDs);
    Object.values(deviceIDs)?.forEach(value => {
      /* if (value === unity_deviceId) {
        response = "OK";
      } */
    })
  })

  res.send(response);
})

// Initialize server
app.listen(3000, () => {
  console.log("Running on port 3000.");
});

// Export the Express API
module.exports = app;