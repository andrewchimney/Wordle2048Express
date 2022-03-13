const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
app.use(express.json({limit:'1mb'}))
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/pages/index.html")
})
app.post("/", (req, res) => {
    console.log(req);
    // let scoresJSON = JSON.parse(fs.readFileSync("public/scores.json", "utf-8"));
    // scoresJSON.yeet = "askjdhflasdfka";
})