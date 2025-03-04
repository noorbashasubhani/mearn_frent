const express = require("express");
const router = express.Router();

const flyerController = require("../controllers/flyerController");


router.post("/addFly", flyerController.addFlyer);
router.post("/Add-coludFlyer", flyerController.addFlyerss);
router.get("/Flyer-list",flyerController.getFlyers);
router.delete("/DeleteFlyer/:id",flyerController.delFlyer);

router.get("/Flyercloudes",flyerController.getFlyersCloude);
module.exports = router;
