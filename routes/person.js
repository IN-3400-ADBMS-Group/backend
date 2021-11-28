const userModel = require("../models/person");
const { Router } = require("express");
const express = require("express");
const router = express.Router();

/*person.get("/", async (req, res) => {
  res.json("person route");
});*/
const user = Router();

user.get("/", async (req, res) => {
  const result = await userModel.findAll();
  res.json(result);
});

user.post("/add", async (req, res) => {
  const result = await userModel.create(req.body);
  res.json(result);
});

user.get("/:id", async (req, res) => {
  const result = await userModel.findById(req.params.id);
  res.json(result);
});
module.exports = user;
