require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const port = 5000;

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("mongo db connected"));

const studentRoute = require("./Routes/Student");
const courseRoute = require("./Routes/Course");

app.use("/student", studentRoute);
app.use("/course", courseRoute);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));