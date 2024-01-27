// Needed Resources 
const express = require("express")
const router = new express.Router() 
const detController = require("../controllers/detController")


// Route to build inventory by ID view
router.get("/detail/:inventoryId", detController.buildByInventoryID);

module.exports = router;