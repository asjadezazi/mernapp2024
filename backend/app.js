const express = require('express');
const app = express();
app.use(express.json())

const user = require("./routes/userRoute")
const product = require("./routes/productRoute")

app.use("/api/v1",product);
app.use("/api/v1",user);

module.exports = app;