const vendorController=require('../controllers/vendorController');
const deparmentController=require('../controllers/departmentController');
const designationController=require('../controllers/designationController');
const cabController=require('../controllers/cabController');
const airportController = require('../controllers/airportController');
const holidayss = require('../controllers/holidayController');
const Hotels = require('../controllers/hotelController');
const Banks = require('../controllers/BankController');
const Users = require('../controllers/userController');

const express = require('express');
const router=express.Router();

router.post('/register',vendorController.vendorRegister);
//router.post('/User-Login',vendorController.vendorLogin);
router.post("/Add-Dept", deparmentController.addDepartment);
router.get("/Dept",deparmentController.getDepartments);
router.post("/Add-Designations",designationController.addDesignation);
router.get("/Desg",designationController.getDesignations);
router.get("/GroupDesinations",designationController.getGroupDesignations);
router.post("/add-cab",cabController.addCab);
router.get("/Cab-list",cabController.cabDatails);
router.delete("/DeleteCab/:id",cabController.delCab);

router.post("/Add-Airports",airportController.createAirport);
router.get("/Airplan-List",airportController.Airpordet);
router.post("/Add-Holidays",holidayss.AddHolidays);
router.get("/HolidayList",holidayss.GetHolidays);
router.delete("/DeleteHoliday/:id",holidayss.DeleteHoliday);
router.put("/UpdateHoliday/:id",holidayss.UpdateHoliday);
router.post("/Add-hotel",Hotels.AddHotel);
router.get("/Gethotels",Hotels.HotelList);
router.delete("/Delete-Hotel/:id",Hotels.DeletHotel);
router.put("/Update-Hotels/:id",Hotels.updateHotels);
router.put("/Update-Bank/:id",Banks.updateBank);
router.get("/Bank-List",Banks.getBank);
router.get("/Bank-Single/:id",Banks.getBankSingle);
router.post("/Add-User",Users.addUser);
router.post("/Check-user",Users.userChecking);
router.post("/User-Login",Users.userLogin);
router.get("/Userlist",Users.userList);

module.exports = router;