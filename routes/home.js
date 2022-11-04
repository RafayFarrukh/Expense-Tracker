const express = require("express");
const router = express.Router();

// Include controllers
const homeController = require("../controllers/home");

// Include authentication middleware

router.get("/", homeController.getHome);

module.exports = router;
