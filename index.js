const express = require("express");
const app = express();
const port = 3005;
const fs = require("fs");
const url = require("url");
const hostname = "127.0.0.1";
var indexFile = fs.readFileSync("./index.html").toString();
var fake_data = require("./fake-data");
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.statusMessage = "ok";
  res.send(indexFile);
});
app.get("/fake-data-api", (req, res) => {
  res.redirect("/fake-data-api/all");
});
app.get("/fake-data-api/all", (req, res) => {
  res.statusCode = 200;
  res.statusMessage = "ok";
  res.set({
    "Content-Type": "text/plain",
  });
  // search by size
  if (req.query.size) {
    let objSize = req.query.size;
    if (objSize > 0 && objSize < 1000) {
      res.send(fake_data.slice(0, objSize));
    } else {
      if (objSize < 1) {
        res.redirect("?size=1");
      } else {
        res.redirect("?size=999");
      }
      res.send("error");
    }
  }
  // search by id
  if (req.query.id) {
    let myId = req.query.id;

    if (myId > 0 && myId < 1000) {
      let newData = fake_data.find((ele) => ele.id == myId);
      res.send(newData);
    } else {
      res.send("id not found");
    }
  }
  // search by gender
  if (req.query.gender) {
    let myGender = req.query.gender;
    let newData;
    if (myGender === "male") {
      newData = fake_data.filter((ele) => ele.gender == "male");
    } else if (myGender === "female") {
      newData = fake_data.filter((ele) => ele.gender == "female");
    } else {
      res.send("error");
    }
    res.send(newData);
  }
  res.send(fake_data);
});
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
