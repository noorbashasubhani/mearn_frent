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
const Registration = require("../controllers/empregistrationController");
const Rip = require("../controllers/ripController");
const advance = require("../controllers/advancesalaryController");
const Position=require("../controllers/positionController");
const Notification = require("../controllers/notificationController");
const Dcreditnote = require("../controllers/dcreditnoteController"); 
const Team=require("../controllers/teamController");
const Recovery=require("../controllers/recoveryController");
const Asset = require("../controllers/assetController");
const Package=require("../controllers/holidaypackageController");
const Ratechat=require("../controllers/ratechatController");





const authenticateToken = require("../middlewares/authenticateToken");






const express = require('express');
const router=express.Router();

router.post('/register',vendorController.vendorRegister);
//router.post('/User-Login',vendorController.vendorLogin);

// Department details
router.post("/Add-Dept", deparmentController.addDepartment);
router.get("/Dept",deparmentController.getDepartments);
router.post("/Add-Designations",designationController.addDesignation);
router.get("/Desg",designationController.getDesignations);

// Designation detaisl
router.get("/GroupDesinations",designationController.getGroupDesignations);


//cab details
router.post("/add-cab",cabController.addCab);
router.get("/Cab-list",cabController.cabDatails);
router.delete("/DeleteCab/:id",cabController.delCab);
router.put("/Cabs/:row_id",cabController.updateCab);

// Airport Details

router.post("/Add-Airports",airportController.createAirport);
router.get("/Airplan-List",airportController.Airpordet);
router.delete("/Airport/:row_id",airportController.delAir);
router.put("/Airport/:row_id",airportController.updateAirport);

// Holidays details
router.post("/Add-Holidays",holidayss.AddHolidays);
router.get("/HolidayList",holidayss.GetHolidays);
router.delete("/DeleteHoliday/:id",holidayss.DeleteHoliday);
router.put("/UpdateHoliday/:id",holidayss.UpdateHoliday);

// Hotels details

router.post("/Add-hotel",Hotels.AddHotel);
router.get("/Gethotels",Hotels.HotelList);
router.delete("/Delete-Hotel/:id",Hotels.DeletHotel);
router.put("/Update-Hotels/:id",Hotels.updateHotels);

// Bank details 
router.put("/Update-Bank/:id",Banks.updateBank);
router.get("/Bank-List",Banks.getBank);
router.get("/Bank-Single/:id",Banks.getBankSingle);
router.get("/User-Bank/:user_id",Banks.getUserBank);



// User details 
router.post("/Add-User",Users.addUser);
router.post("/Check-user",Users.userChecking);
router.post("/User-Login",Users.userLogin);
router.get("/Userlist",Users.userList);
router.post("/Registration",Users.employeeRegistartions);
router.put("/Bank-Update/:row_id",Users.updateBank);



router.put("/Change-Password/:id",Users.changePassword);
router.get("/test",Users.Test);
router.put("/update-user/:row_id",Users.updateUser);
router.get("/Single-user/:user_id",Users.getUserId);

// Complaints detsila
router.post("/complaints/:user_id",Complaints.addComplaints);
router.get("/complaints/",Complaints.allComplaints);
router.delete("/complaints/:row_id",Complaints.delete);
router.get("/complaints/:row_id",Complaints.singleComplaints);
router.put("/complaints/:row_id",Complaints.update);

//   Includes and excludes 
router.post("/inc-exc/:user_id",Inclusion.createInclusions);
router.get("/incexc",Inclusion.getAll);
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


//  emp registration //
router.post("/Registration",Registration.empRegistration);
router.get("/Employee-Details/:user_id",Registration.getUserWithReference);
router.get("/Employelist",Registration.empDetails);
router.post("/Partner-Registration",Registration.parttRegistartions);

// Rip Details
router.post("/RIP/:user_id",Rip.AddRip);
router.get("/RIP",Rip.getDetaRip);

// advance salary
router.post("/Advancesalary/:user_id",advance.addSalary);
router.get("/Advancesalary",advance.getSalarydetails);


// Position Details
router.post("/Positions/:user_id",Position.addJobPosting);
router.get("/Positions",Position.GetAllJobs);
router.get("/Positions/:row_id",Position.GetSingleJobs);
router.put("/PositionsClose/:row_id",Position.closePosition);
router.put("/PositionsDelete/:row_id",Position.DeletePosition);


// Notification details

router.post("/Notifications",Notification.AddNotification);
router.get("/Notifications",Notification.NotificationList);
router.get("/Notifications/:row_id",Notification.getSinleNotification);
router.delete("/Notifications/:row_id",Notification.delNotificaton);
router.put("/Notifications/:row_id",Notification.readStatus);



// Domestic Credit notes details
router.post("/Credit-Domestic-Note",authenticateToken,Dcreditnote.AddDomesticCredit);
router.get("/Credit-Domestic-Note",authenticateToken,Dcreditnote.getDomesticCredits);

// Teams details
router.post("/Teams",authenticateToken,Team.addTeam);
router.get("/Teams",authenticateToken,Team.getTeams);
router.delete("/Teams/:row_id",authenticateToken,Team.DelTeam);


// Recovery Details

router.post("/Recovery",authenticateToken,Recovery.addRecovery);
router.get("/Recovery",authenticateToken,Recovery.getRecovery);
router.put("/Recovery/:row_id",authenticateToken,Recovery.updateRecovery);

// Assets Details 
router.post("/Assets",Asset.addAssets);
router.get("/Assets",Asset.getAssets);
router.delete("/Assets/:row_id",Asset.delAss);
router.put("/Assets/:row_id",Asset.updateAssets);


// Package menu

router.post("/Package/:user_id",Package.addPackage);
router.get("/Package/:row_id",Package.getHoidaysOnly);
router.get("/Package",Package.getHoidaysAll);
router.delete("/Package/:row_id",Package.deletePack);
router.put("/Package/:row_id",Package.updatePack);


router.post("/Rate-chat",Ratechat.addRatechat);
router.get("/Rate-chat",Ratechat.getsRates);
router.delete("/Rate-chat/:row_id",Ratechat.deletRates);
router.put("/Rate-chat/:row_id",Ratechat.editRatechat);


module.exports = router;