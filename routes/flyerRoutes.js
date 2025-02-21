const express = require("express");
const router = express.Router();

const flyerController = require("../controllers/flyerController");

router.post("/addFly", flyerController.addFlyer);
router.get("/Flyer-list",flyerController.getFlyers);

module.exports = router;
