const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

//routes
const personRouter = require("./routes/person");
app.use("/person", personRouter);

app.listen("3001", () => {
  console.log("running");
});
