// Add Express
const express = require("express");
const path = require("path");

/* const deviceIdList = []; */

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
  /* deviceIdList?.forEach(deviceId => {
    if (deviceId === unity_deviceId) {
      response = "OK";
    }
  }) */

  res.send(response);
})

app.post("/login_success", (req, res) => {
  /* let web_deviceId = req.body.deviceId;
  deviceIdList.push(web_deviceId); */
  res.send("PUSHED");
})

// Initialize server
app.listen(3000, () => {
  console.log("Running on port 3000.");
});

// Export the Express API
module.exports = app;