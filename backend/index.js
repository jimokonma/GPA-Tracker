const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.URI;

// Middle wwears
app.use(cors());
app.use(bodyPaser.json());

// db connection
mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongoDB successfully");
  }
);

// Import Routes
const gpaRoute = require("./routes/gpaRoute");

app.use("/api/gpa", gpaRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
