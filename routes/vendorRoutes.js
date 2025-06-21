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
const Employee=require("../controllers/EmployeeController.js");
const Icredit=require("../controllers/icreditController.js");
const Mybank=require("../controllers/mybankController.js");
const Leaves=require("../controllers/LeavesController.js");
const lead=require("../controllers/LeadController.js");
const Comment=require("../controllers/commentController.js");
const Accounts=require("../controllers/AccountController.js");
const Tee=require('../controllers/TeeController.js');
const Test=require('../controllers/TestController.js');
const Buss=require('../controllers/BusController.js');
const Train=require('../controllers/TrainController.js');
const Supplier=require('../controllers/SupplierController.js');
const Supplementry=require('../controllers/SupplementryController.js');
const Cruise=require('../controllers/CruiseController.js');
const Visa=require('../controllers/VisaController.js');
const Tcs=require('../controllers/TcsController.js');
const Onlinehotel=require('../controllers/OnlineHotelController.js');
const Flights=require('../controllers/FlightsController.js');
const Transport=require('../controllers/TransportController.js');
const Day=require('../controllers/DayController.js');
const Caluculation=require('../controllers/CaluculationController.js');
const Message=require('../controllers/messageController.js');
const FormPackDetail=require('../controllers/formPackDetailController.js');
const theams=require('../controllers/themeController.js');
//const FormIncExc=require('../controllers/formIncExcController.js');
const formIncExcController=require('../controllers/formIncExcController');
const DomesticHotel=require('../controllers/DomesticHotelController.js');
const Google=require('../controllers/GoogleController.js');
const Attendance=require('../controllers/AttendanceController.js');

const ledgerController = require('../controllers/ledgerController');



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
router.delete("/Dept/:id",deparmentController.deleteDepartment);
router.delete("/Desg/:row_id",designationController.deleteDesingnation);

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
router.put("/Registrations/:row_id",Users.updateEmployees);
router.put("/Bank-Update/:row_id",Users.updateBank);
router.get("/Birthdays",authenticateToken,Users.getbirthday);
router.delete("/DelUser/:row_id",Users.delUser);
router.get("/Pendinguser",Users.Pending_list);
router.get("/Email-check/:email",Users.emailCheck);
router.get("/Partners",Users.partnerList);
router.get('/payroll/:month', Users.getPayrollData);
router.post('/Addincentive/:id', Users.addInsentives);
router.get('/GetInsentive/:month_year', Users.getInsentive);
router.put('/ParrollApprove/:id', Users.approveIncentive);




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
router.post("/Destination",authenticateToken,Destination.createDestination);
router.get("/Destination",Destination.getAllDestination);
router.get("/Destination/:row_id",Destination.getSinglerowDestination);
router.delete("/Destination/:row_id",Destination.deleteDestination);
router.put("/Destination/:row_id",Destination.updateDestination);
router.get("/Domestic-Destination",Destination.getDomesticDetsinations);
router.get("/Cruise-Destination",Destination.getCruiseDestinations);
router.get("/Cities",Destination.getCities);

// bank details

router.post("/Compay-Bank",Companybank.createBank);
router.get("/Compay-Bank",Companybank.getcompBank);
router.get("/Compay-Bank/:row_id",Companybank.getSingleComBank);
router.delete("/Compay-Bank/:row_id",Companybank.deleteComBank);
router.put("/Compay-Bank/:row_id",Companybank.updateComBank);


// Inflow Details
router.post("/Inflow",Inflow.addInflow);
router.get("/Inflow",Inflow.getAllInflows);
router.get("/Inflow/:row_id",Inflow.getSingleInflow);
router.delete("/Inflow/:row_id",Inflow.deleteInflow);
router.put("/Inflow/:row_id",Inflow.updateInflow);

// Out Flow Details
router.post("/Outflow",Outflow.addOutflow);
router.get("/Outflow",Outflow.getAllOutflows);
router.get("/Outflow/:row_id",Outflow.getSingleOutflow);
router.delete("/Outflow/:row_id",Outflow.deleteOutflow);
router.put("/Outflow/:row_id",Outflow.updateOutflow);

// Out Flow Details
router.post("/Office-expences",Officexc.addOfiiceexc);
router.get("/Office-expences",Officexc.getAllOfficexc);
router.get("/Office-expences/:row_id",Officexc.getSingleOfficexc);
router.delete("/Office-expences/:row_id",Officexc.deleteOfficexc);
router.put("/Office-expences/:row_id",Officexc.updateOutflow);

// Ohter exc

router.post("/Other-expences",Otherexc.addOtherflow);
router.get("/Other-expences",Otherexc.getAllOtherflows);
router.get("/Other-expences/:row_id",Otherexc.getSingleOtherflow);
router.delete("/Other-expences/:row_id",Otherexc.deleteOtherflow);
router.put("/Other-expences/:row_id",Otherexc.updateOtherflow);

// Investments 
router.post("/Invest",Investment.addInst);
router.get("/Invest",Investment.getInst);
router.get("/Invest/:row_id",Investment.getSingleInst);
router.delete("/Invest/:row_id",Investment.deleteInst);
router.put("/Invest/:row_id",Investment.updateInst);


// Tax 
router.post("/Taxe",Taxes.addTax);
router.get("/Taxe",Taxes.getTax);
router.get("/Taxe/:row_id",Taxes.getSingleTax);
router.delete("/Taxe/:row_id",Taxes.deleteTax);
router.put("/Taxe/:row_id",Taxes.updateTax);


//  emp registration //
//router.post("/Registration",Registration.empRegistration);
router.get("/Employee-Details/:user_id",Registration.getUserWithReference);
router.get("/Employelist",Registration.empDetails);
router.post("/Partner-Registration",Registration.parttRegistartions);

// Rip Details
router.post("/RIP",authenticateToken,Rip.AddRip);
router.get("/RIP",Rip.getDetaRip);

// advance salary
router.post("/Advancesalary",authenticateToken,advance.addSalary);
router.get("/Advancesalary",advance.getSalarydetails);

router.post("/Addsalary",authenticateToken,advance.addingAmounts);
router.get("/Addsalary",authenticateToken,advance.getAmounts);
router.put("/Addsalary/:id",authenticateToken,advance.updateAmount);
router.delete("/Addsalary/:id",authenticateToken,advance.deletAmount);

// Position Details
router.post("/Positions",authenticateToken,Position.addJobPosting);
router.get("/Positions",Position.GetAllJobs);
router.get("/Positions/:row_id",Position.GetSingleJobs);
router.put("/PositionsClose/:row_id",Position.closePosition);
router.delete("/PositionsDelete/:row_id",Position.DeletePosition);


// Notification details
router.post("/Notifications",Notification.AddNotification);
router.get("/Notifications",Notification.NotificationList);
router.get("/Notifications/:row_id",Notification.getSinleNotification);
router.delete("/Notifications/:row_id",Notification.delNotificaton);
router.put("/Notifications/:row_id",Notification.readStatus);

// Domestic Credit notes details
router.post("/Credit-Domestic-Note",authenticateToken,Dcreditnote.AddDomesticCredit);
router.get("/Credit-Domestic-Note",Dcreditnote.getDomesticCredits);
//router.delete("/Credit-Domestic-Note",Dcreditnote.deleteDestination);
router.delete("/Credit-Domestic-Note/:row_id",Dcreditnote.deleteDomCredits);


// Teams details
router.post("/Teams/:user_id",Team.addTeam);
router.get("/Teams",Team.getTeams);
router.delete("/Teams/:row_id",Team.DelTeam);


// Recovery Details
router.post("/Recovery",authenticateToken,Recovery.addRecovery);
router.get("/Recovery",Recovery.getRecovery);
router.put("/Recovery/:row_id",Recovery.updateRecovery);

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

//Employee Details
router.post("/Employee/:row_id",authenticateToken,Employee.createEmployees);
router.post("/Projects/:row_id",authenticateToken,Employee.addProject);
router.get("/Employee/",authenticateToken,Employee.getEmpl);
router.get("/Projects/",authenticateToken,Employee.getProjects);


// internation Credit notes Details

router.post("/Internation-Creditnote",authenticateToken,Icredit.addIcredits);
router.get("/Internation-Creditnote",Icredit.getIntercredit);
router.get("/Internation-Creditnote/:row_id",Icredit.getIntercreditSingle);
router.delete("/Internation-Creditnote/:row_id",Icredit.deleteIcreditNote);


// My bank bank details
router.post("/My-bank",Mybank.addmyBank);
router.get("/My-bank",Mybank.getMybank);
router.put("/My-bank/:row_id",Mybank.updateMybank);


// Leave Managements 

router.post("/Leaves",authenticateToken,Leaves.addLeave);
router.get("/Leaves",Leaves.getLeaves);
router.get("/SingleLeaves/:row_id",Leaves.getSingle);


// LEADS DETAILS
router.post("/lead",authenticateToken,lead.addLead);
router.get("/lead",lead.getLead);
router.get("/singlelead/:lead_id",lead.getLeadsdetails);
router.put("/lead/:row_id",lead.update);
router.put("/Delete-pending/:row_id",lead.pendingDelete);
router.put("/Assign/:row_id",authenticateToken,lead.updateAssign);
router.get("/rnrleads",lead.getLeadRnr);
router.put("/Processed/:lead_id",authenticateToken,lead.processed);
router.get("/Processed-delete",lead.deleteLead);
router.get("/Executives-summary",lead.getUniqueOperationExecutives);
router.delete("/Leadsdel",lead.parmentDelet);
router.get("/DayleadCount",lead.gettotaldaywisecount);
router.get("/DaypreleadCount",lead.getpretotaldaywisecount);
router.get("/Lead-Sources-list",lead.getLeadSourceHolidaySplit);
router.get("/Lead-Search-list",lead.getSearchLeadsdetails);
router.get("/Pending-Itenary",lead.getItenery);
router.get("/Published-Itenary",lead.publisheItinery);
router.get("/Modified-Itenray/:id",lead.getSelectedItinery);
router.post('/duplicate/:doc_id', lead.duplicateDoc);
router.put('/update-status-confirm/:id', lead.doConfirmStatus);
router.get('/confirm', lead.getAllCofirmedItinery);
router.get('/Cancelled', lead.getAllCancelledItinery);
router.put('/cancel-itinerary/:id', lead.doCancelledStatus);
router.put('/gift-voucher/:id', lead.giveGiftVoucher);
router.get('/GIFT-LIST', lead.getGiftVochers);
router.get('/comentleads-comments/:year/:executiveId', lead.getLeadsCommentsDetails);





router.get("/Delete-Itenarylist",lead.getDeletedItenery);
router.get("/All-Leads",lead.allLeads);
router.put("/Customer-inf/:row_id",lead.customerinf);
router.get("/QC-LIST",lead.getQcLeads);
router.put("/update-status/:id",lead.doApprove);
router.put("/update-status-reject/:id",lead.doRejects);
router.put("/update-status-publish/:id",lead.doPublish);

// Comments details
router.post("/Comment",authenticateToken,Comment.addComment);
router.get("/Comment/:lead_id",Comment.getComment);
router.post("/ExecutiveCommant/:lead_id",authenticateToken,Comment.getExc);



router.post("/Add-acc",Accounts.addAcc);
router.get("/GetAcc",Accounts.getData);
router.put('/update-acc/:account_id', Accounts.updateAcc);


// Tea controllers   

router.post("/Add-Tee",Tee.createTee);
router.get('/tee', Tee.getAllTees);
router.delete('/tee/:id', Tee.deleteTee);
router.put('/tee/:id', Tee.updateTee);

// Train Detailis
router.post("/Train/:row_id",Train.addTrain);
router.get("/Train",Train.getTrainDetails);
router.get("/Train/:id",Train.getTrainDetailselected);
router.delete("/Train/:row_id",Train.deleteTrain);
router.put("/Train/:row_id",Train.editTrain);



// Suppliers Detailis

router.post('/Supplier/:doc_id', Supplier.createSupplier);
router.get('/Supplier/:doc_id', Supplier.getSuppliersByDocId);
router.put('/Supplier/:id', Supplier.updateSupplier);
router.delete('/Supplier/:id', Supplier.deleteSupplier);


// Suppliers Detailis
router.post("/supplimentry/:lead_id",Supplementry.addSupp);
router.get("/supplimentry",Supplementry.getSuppl);
router.get("/supplimentry/:id",Supplementry.getSupplsel);
router.delete("/supplimentry/:row_id",Supplementry.delSupp);
router.put("/supplimentry/:row_id",Supplementry.updateSup);


// cruise Details
router.post("/Cruise/:lead_id",Cruise.addCruise);
router.get("/Cruise",Cruise.getCruise);
router.get("/Cruise/:id",Cruise.getCruisesel);
router.delete("/Cruise/:row_id",Cruise.delCruise);
router.put("/Cruise/:row_id",Cruise.updateCruise);


// cruise Details
//router.post("/Visa/:lead_id",Visa.addVisa);
//router.get("/Visa",Visa.getVisa);
router.post('/Visa/:lead_id', Visa.addOrUpdateVisa);
router.get("/Visa/:doc_id",Visa.getVisaById);

// cruise Details
router.post("/tcs/:lead_id",Tcs.addTcs);
router.get("/tcs/:lead_id",Tcs.getTcs);

// Buss Details
router.post("/Addbus/:row_id",Buss.createBus);
router.get("/getBuss",Buss.getAllBuses);
router.get("/getBussrel/:id",Buss.getAllBusesRelated);
router.delete("/Delbus/:id",Buss.deleteBus);
router.put("/Bus/:id",Buss.updateBus);
//router.get("/getItenaryBus",Buss.getAllBusesRelated);



// Online hotels 
router.post("/online/:row_id",Onlinehotel.addOnlineHotels);
router.get("/online",Onlinehotel.getOnlineHotels);
router.get("/online/:id",Onlinehotel.getOnlineHotelsel);
router.delete("/online/:row_id",Onlinehotel.delOnline);
router.put("/online/:row_id",Onlinehotel.updateOnline);

// HOTELS
router.post("/Flights/:row_id",Flights.addFlight);
router.get("/Flights",Flights.getFlights);
router.get("/Flights/:id",Flights.getFlightById);
router.delete("/Flights/:row_id",Flights.deleteFlight);
router.put("/Flights/:row_id",Flights.updateFlights);


// Testing component is 
router.post('/testingnow',Test.createTest);
router.get('/testingnow',Test.getAllTests);
//router.delete('/testdel',Test.deleteTest);


// Transpot details 
router.post("/Transports/:lead_id",Transport.addTransport);
router.get("/Transports",Transport.getTransport);
router.get("/Transports/:id",Transport.getTransportsel);
router.put("/Transports/:row_id",Transport.updateTrans);
router.delete("/Transports/:row_id",Transport.delTransport);



// Day details 
router.post("/day/:lead_id",Day.addDay);
router.get("/day",Day.getDauys);
router.get("/day/:id",Day.getDauysel);
router.delete("/day/:row_id",Day.delDay);
router.put("/day/:row_id",Day.updateDay);



// Caluculation detaiils

router.post("/Cal/:row_id",Caluculation.addCalculation);
router.get("/Cal",Caluculation.getCal);
router.get("/Calsingle/:doc_id",Caluculation.getCalSingle);
router.put("/Calup/:doc_id",Caluculation.updateCal);
router.post('/CalSave/:id', Caluculation.createOrUpdateCal);


// Message details here

router.post('/Mess', Message.createMessage);
router.get('/Mess', Message.getAllMessages);
router.get('/Mess/:id', Message.getMessageById);
router.delete('/Mess/:id', Message.deleteMessage);
router.put('/Mess/:id', Message.updateMessage);



// Package details :.
router.post('/FormPack/:id', FormPackDetail.createFormPackDetail);
router.get('/FormPack', FormPackDetail.getAllFormPackDetails);
router.get('/FormPack/:id', FormPackDetail.getFormPackDetailById);
router.put('/FormPack/:id', FormPackDetail.updateFormPackDetail);
router.delete('/FormPack/:id', FormPackDetail.deleteFormPackDetail);



// THeams details
router.get('/Theams', theams.getAllThems);


// Form Inclusions and exlusions
router.post('/Form-inc/:id', formIncExcController.createOrUpdateFormIncExc);
router.put('/Form-inc/:doc_id', formIncExcController.createOrUpdate);
router.get('/Form-inc-All', formIncExcController.getFormAllIncExc);
router.get('/Form-inc-All/:id', formIncExcController.getByDocId);


// Domestic hotel DomesticHotel
router.post('/Domestic-Hotel/:id', DomesticHotel.createHotelDetail);
router.get('/Domestic-Hotel/:id', DomesticHotel.getHotelDetailsByDocId);
router.delete('/Domestic-Hotel/:id', DomesticHotel.deleteHotelDetail);
router.put('/Domestic-Hotel/:id', DomesticHotel.updateHotelDetail);


// Total amount caluculation 
router.get('/Cal/:doc_id', lead.getTotalAmountsByDocId);
router.get('/Cal-INC/:doc_id', lead.getTotalAmountsByDocIdInt);


// Total google details

router.get('/Googel',Google.getAllReviews);
router.post('/Googel',Google.addReview);
router.get('/Googel/:doc_id',Google.getSelectCustomer);
router.put('/Googel/:id',Google.updateReviewStatus);
router.get('/All-Reviews', lead.leadwiseReviews);


// Attendance 
router.post('/Attendance',Attendance.addAttendance);
router.get('/Attendance/:date',Attendance.getAttendanceByDate);
//router.get('/attendance/by-user', Attendance.getAttendanceByUserAndMonth);
router.get('/Attendance/:user_id/:month', Attendance.getAttendanceByUserAndMonth);



router.post('/ledger', ledgerController.addLedger);
router.get('/ledger', ledgerController.getAllLedgers);
router.get('/ledger/:id', ledgerController.getLedgerById);
router.put('/ledger/:id', ledgerController.updateLedger);
router.delete('/ledger/:id', ledgerController.deleteLedger);



module.exports = router;
