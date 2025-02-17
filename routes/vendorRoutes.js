const vendorController=require('../controllers/vendorController');
const deparmentController=require('../controllers/departmentController');
const designationController=require('../controllers/designationController');
const express = require('express');
const router=express.Router();

router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.post("/Add-Dept", deparmentController.addDepartment);
router.get("/Dept",deparmentController.getDepartments);
router.post("/Add-Designations",designationController.addDesignation);
router.get("/Desg",designationController.getDesignations);
module.exports = router;