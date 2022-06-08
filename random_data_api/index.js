const express = require("express");
const app = express();
const port = 3009;
const fs = require("fs");
const data = require("./data");
const url = require("url");
const getURL = require("./getURL");
const responseObj = require("./responseObj");
const hostname = "127.0.0.1";
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.statusMessage = "ok";
  res.redirect("/all");
});
app.get("/all", (req, res) => {
  res.statusCode = 200;
  res.statusMessage = "ok";
  res.set({
    "Content-Type": "text/plain",
  });
  if (req.query.size) {
    let objSize = req.query.size;
    if (objSize > 0 && objSize < 1000) {
      res.send(data.slice(0, objSize));
    } else {
      // if (objSize < 1) {
      //     res.send(data.slice(0, 1));
      // }
      // else {
      //     res.send(data);
      // }
      res.send("error");
    }
  }
  if (req.query.id) {
    let myId = req.query.id;

    if (myId > 0 && myId < 1000) {
      let newData = data.find((ele) => ele.id == myId);

      res.send(responseObj(newData));
    }
  }
  if (req.query.gender) {
    let myGender = req.query.gender;
    let newData;
    if (myGender === "male") {
      newData = data.filter((ele) => ele.gender == "male");
    } else if (myGender === "female") {
      newData = data.filter((ele) => ele.gender == "female");
    } else {
      res.send("error");
    }
    res.send(responseObj(newData));
  }
  res.send(data);
});
app.get("/all/:prop", (req, res) => {
  const curURL = new URL(getURL(req));
  const property = req.params.prop;
  let hasProperty = data.every((e) => e[property]);
  let newObj = {};
  data.forEach((e, index) => {
    newObj[index] = {
      [property]: e[property],
    };
  });
  res.send(JSON.stringify(newObj));
});
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
