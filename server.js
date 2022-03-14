const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
app.use(express.json({limit:'1mb'}))
app.use(express.static("public"));
module.exports = app;