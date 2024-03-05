const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

const bookrecord = require("./routes/BookRecord");

app.get("/", (req, res) => {
  res.json({
    status: "SUCCESS",
    message: "Server is Active and running",
  });
});

app.use(bookrecord);

app.listen(process.env.PORT, (error) => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    )
    .catch((err) => console.log(err));
});
