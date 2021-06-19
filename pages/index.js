const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:component", async function(req, res){
    res.render(`pages/${req.params.component}`);
})

module.exports = router;