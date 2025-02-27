const vendorController=require('../controllers/vendorController');
const deparmentController=require('../controllers/departmentController');
const designationController=require('../controllers/designationController');
const cabController=require('../controllers/cabController');
const airportController = require('../controllers/airportController');
const holidayss = require('../controllers/holidayController');
const Hotels = require('../controllers/hotelController');
const Banks = require('../controllers/BankController');
const Users = require('../controllers/userController');
const Complaints = require('../controllers/complaintController');
const Inclusion = require('../controllers/InclusionController');
const Destination =require('../controllers/destinationController');
const Companybank = require('../controllers/companybankController');
const Inflow = require("../controllers/InflowController");
const Outflow = require("../controllers/outflowController");
const Officexc = require("../controllers/officeexController");
const Otherexc = require("../controllers/otherexcController");
const Investment = require("../controllers/investmentController");
const Taxes = require("../controllers/taxesController");






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
router.put("/Change-Password/:id",Users.changePassword);
router.post("/complaints/:user_id",Complaints.addComplaints);
router.get("/complaints/",Complaints.allComplaints);
router.delete("/complaints/:row_id",Complaints.delete);
router.get("/complaints/:row_id",Complaints.singleComplaints);
router.put("/complaints/:row_id",Complaints.update);

//   Includes and excludes 
router.post("/inc-exc/:user_id",Inclusion.createInclusions);
router.get("/inc-exc",Inclusion.getAll);
router.get("/inc-exc/:row_id",Inclusion.getSinglerow);
router.delete("/inc-exc/:row_id",Inclusion.delete);
router.put("/inc-exc/:row_id",Inclusion.updatess);

// destination //
router.post("/Destination/:user_id",Destination.createDestination);
router.get("/Destination",Destination.getAllDestination);
router.get("/Destination/:row_id",Destination.getSinglerowDestination);
router.delete("/Destination/:row_id",Destination.deleteDestination);
router.put("/Destination/:row_id",Destination.updateDestination);

// bank details

router.post("/Compay-Bank",Companybank.createBank);
router.get("/Compay-Bank",Companybank.getcompBank);
router.get("/Compay-Bank/:row_id",Companybank.getSingleComBank);
router.delete("/Compay-Bank/:row_id",Companybank.deleteComBank);
router.put("/Compay-Bank/:row_id",Companybank.updateComBank);


// Inflow Details
router.post("/Inflow/:user_id",Inflow.addInflow);
router.get("/Inflow",Inflow.getAllInflows);
router.get("/Inflow/:row_id",Inflow.getSingleInflow);
router.delete("/Inflow/:row_id",Inflow.deleteInflow);
router.put("/Inflow/:row_id",Inflow.updateInflow);

// Out Flow Details
router.post("/Outflow/:user_id",Outflow.addOutflow);
router.get("/Outflow",Outflow.getAllOutflows);
router.get("/Outflow/:row_id",Outflow.getSingleOutflow);
router.delete("/Outflow/:row_id",Outflow.deleteOutflow);
router.put("/Outflow/:row_id",Outflow.updateOutflow);

// Out Flow Details
router.post("/Office-expences/:user_id",Officexc.addOfiiceexc);
router.get("/Office-expences",Officexc.getAllOfficexc);
router.get("/Office-expences/:row_id",Officexc.getSingleOfficexc);
router.delete("/Office-expences/:row_id",Officexc.deleteOfficexc);
router.put("/Office-expences/:row_id",Officexc.updateOutflow);

// Ohter exc

router.post("/Other-expences/:user_id",Otherexc.addOtherflow);
router.get("/Other-expences",Otherexc.getAllOtherflows);
router.get("/Other-expences/:row_id",Otherexc.getSingleOtherflow);
router.delete("/Other-expences/:row_id",Otherexc.deleteOtherflow);
router.put("/Other-expences/:row_id",Otherexc.updateOtherflow);

// Investments 
router.post("/Invest/:user_id",Investment.addInst);
router.get("/Invest",Investment.getInst);
router.get("/Invest/:row_id",Investment.getSingleInst);
router.delete("/Invest/:row_id",Investment.deleteInst);
router.put("/Invest/:row_id",Investment.updateInst);


// Tax 
router.post("/Taxe/:user_id",Taxes.addTax);
router.get("/Taxe",Taxes.getTax);
router.get("/Taxe/:row_id",Taxes.getSingleTax);
router.delete("/Taxe/:row_id",Taxes.deleteTax);
router.put("/Taxe/:row_id",Taxes.updateTax);


module.exports = router;