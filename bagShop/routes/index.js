const { Router } = require("express");
const express = require('express');
const router = express.Router();

router.get("/" , ( req , res ) => {
    res.render("index", { error: "" } )
})


module.exports = router ;