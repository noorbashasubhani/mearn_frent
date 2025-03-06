const express = require("express");
const router = express.Router();

const flyerController = require("../controllers/flyerController");
const Theam = require("../controllers/themeController");


router.post("/addFly", flyerController.addFlyer);
router.post("/Add-coludFlyer", flyerController.addFlyerss);
router.get("/Flyer-list",flyerController.getFlyers);
router.delete("/DeleteFlyer/:id",flyerController.delFlyer);

router.get("/Flyercloudes",flyerController.getFlyersCloude);


// Them images details
router.post("/Thems",Theam.addThems);
router.get("/Thems",Theam.getAllThems);
router.get("/Thems/:row_id",Theam.getSingleThems);



module.exports = router;
