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
  let unity_uid = parseInt(req.body.UID);

  onValue(ref(db, "/UIDs"), snapshot => {
    let response = "NO";
    let UIDs = snapshot.val();
    for (var uid_key in UIDs) {
      if (UIDs[uid_key] === unity_uid) {
        response = "OK";
      }
    }
    res.send(response);
  })
})

// Initialize server
app.listen(3000, () => {
  console.log("Running on port 3000.");
});

// Export the Express API
module.exports = app;