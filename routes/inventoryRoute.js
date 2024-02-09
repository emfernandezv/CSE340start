// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/add-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory by ID view
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryID));


// Route to build inventory by classification view
router.get("/", utilities.handleErrors(invController.buildManagementView ));

// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

//route to build the view to add inventory
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Route to build add classification 
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to build post a new inventory
router.post("/add-inventory",regValidate.InventoryRules(), regValidate.checkInventoryData,utilities.handleErrors(invController.registerInventory));

// Route to build the view to modify an inventory
router.get("/edit/:inv_id", utilities.handleErrors(invController.DislayInventoryEditView));


module.exports = router;