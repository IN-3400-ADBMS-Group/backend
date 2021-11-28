const groupModel = require("../models/group");
const { Router } = require("express");
const express = require("express");
const router = express.Router();

const group = Router();

group.get("/", async (req, res) => {
  const result = await groupModel.findAll();
  res.json(result);
});

group.post("/add", async (req, res) => {
  const result = await groupModel.create(req.body);
  res.json(result);
});

group.get("/:id", async (req, res) => {
  const result = await groupModel.findById(req.params.id);
  res.json(result);
});

group.post("/create", async (req, res) => {
  const result = await groupModel.createRelation(req.body);
  res.json(result);
});
group.get("/follow", async (req, res) => {
  const result = await groupModel.follow(req.body);
  res.json(result);
});
module.exports = group;
