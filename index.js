// Add Express
const express = require("express");
const path = require("path");
const config = require("./config");
const database = require("firebase/database");
const { log } = require("console");
const db = config.db;
const onValue = database.onValue;
const ref = database.ref;
const set = database.set;
const update = database.update;
const remove = database.remove;


// Initialize Express
const app = express();
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.post("/authenticate", (req, res) => {
  let unity_uid = parseInt(req.body.UID);

  const uidRef = ref(db, `/UIDs`);
  let authenticated = false;

  onValue(uidRef, snapshot => {
    let UIDs = snapshot.val();
    for(let uid_key in UIDs) {
      if (UIDs[uid_key] === unity_uid) {
        authenticated = true;
      }
    }
    
    return;
  });


  if (authenticated) {
    const newUserRef = ref(db, `${unity_uid}`);
    set(newUserRef, {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
      level8: 0,
    });
    res.send('OK');
  }
})

app.post("/getAllScores", (req, res) => {
  let unity_uid = parseInt(req.body.UID);
  let firebaseLevels = {};

  onValue(ref(db, `/${unity_uid}`), snapshot => {
    let levels = snapshot.val();
    for (level_key in levels) {
      firebaseLevels[level_key] = levels[level_key];
    }

    return;
  })

  res.send(firebaseLevels);
})

app.post("/postScore", (req, res) => {
  let unity_uid = parseInt(req.body.UID);
  let unity_level = req.body.Level;
  let unity_score = parseInt(req.body.Score);

  update(ref(db, `/${unity_uid}`), {
    [unity_level]: unity_score
  });

  res.send("OK");
})

// Initialize server
app.listen(3000, () => {
  console.log("Running on port 3000.");
});

// Export the Express API
module.exports = app;