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

user.put("/:id", async (req, res) => {
  const result = await userModel.update(req.params.id, req.body);
  res.json(result);
});
user.delete("/:id", async (req, res) => {
  const result = await userModel.deleted(req.params.id);
  res.json(result);
});

user.post("/create", async (req, res) => {
  const result = await userModel.createRelation(req.body);
  res.json(result);
});
user.get("/friends", async (req, res) => {
  const result = await userModel.friends(req.body);
  res.json(result);
});
user.delete("/delete", async (req, res) => {
  const result = await userModel.deletedRelation(req.body);
  res.json(result);
});
module.exports = user;
