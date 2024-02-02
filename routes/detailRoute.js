// Needed Resources 
const express = require("express")
const router = new express.Router() 
const detController = require("../controllers/detController")
const utilities = require("../utilities")

// Route to build inventory by ID view
router.get("/detail/:inventoryId", utilities.handleErrors(detController.buildByInventoryID));

module.exports = router;