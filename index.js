const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

//app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
const user = require("./routes/person");
app.use("/", user);

app.listen("3001", () => {
  console.log("running");
});
