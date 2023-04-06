const express = require('express')
const router = express.Router();

//routes
router.use("/recipe", require("./recipe"))
router.use("/unit-of-measure", require("./unit-of-measure"))

module.exports = router