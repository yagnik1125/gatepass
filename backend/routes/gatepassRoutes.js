const express = require("express");
const router = express.Router();
const { fetchAllGatepass,createGatepass,returnEntry,deleteGatepass,gatepassByDetails } = require("../controllers/gatepassController"); //import controller

router.route("/fetchAllGatepass").get(fetchAllGatepass);//for fetching all the gatepasses from database
router.route("/gatepassByDetails").get(gatepassByDetails);//for fetching gatepasses by certain details from database
router.route("/createGatepass").post(createGatepass);//creating new gatepass and insert it into database
router.route("/returnEntry").put(returnEntry);//updating gatepass--> making student return entry in database
router.route("/deleteGatepass").delete(deleteGatepass);//Deleting gatepass from database

module.exports = router;