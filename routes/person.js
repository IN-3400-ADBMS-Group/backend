const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json("person route");
});

module.exports = router;
