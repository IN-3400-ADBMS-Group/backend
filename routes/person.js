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

user.post("/", async (req, res) => {
  const result = await userModel.create(req.body);
  res.json(result);
});

module.exports = user;
