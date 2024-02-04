const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by InventoryID view
 * ************************** */
invCont.buildByInventoryID = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryById(inventory_id)
  const detail = await utilities.buildInventoryDetail(data)
  let nav = await utilities.getNav()
  const title = data[0].inv_year + " "+ data[0].inv_make + " "+ data[0].inv_model  
  res.render("./detail/details", {
    title: title ,
    nav,
    detail,
  })
}

/* Build management*/
invCont.buildManagement = async function(req, res){
  const nav = await utilities.getNav()
  //req.flash("notice", "This is a flash message.")
  res.render("./inventory/management", 
    {title: "Management", 
    nav})
}

/* Build add classification*/
invCont.buildAddClassification = async function(req, res){
  const nav = await utilities.getNav()
  //req.flash("notice", "This is a flash message.")
  res.render("inventory/add-classification", 
    {title: "Adding Classification", 
    nav,
  errors:null})
}

/* Build add inventory*/
invCont.buildAddInventory = async function(req, res){
  const nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationSelect();
  res.render("inventory/add-inventory", 
    {title: "Adding Inventory", 
    nav,
    errors:null,
    classificationSelect})
}

/* Add Classification */
invCont.registerClassification = async function(req, res, next){
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const invResult = await invModel.registerClassification(
    classification_name
  )
if (invResult) {
  req.flash(
    "notice",
    `Classification Added Successfully.`
  )
  let nav = await utilities.getNav()
  res.status(201).render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
} else {
  req.flash("notice", "Sorry, adding the Classification failed.")
  res.status(501).render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}
}
/*** Add Inventory */
invCont.registerInventory = async function(req, res, next){
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationSelect();
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id  } = req.body

  const invResult = await invModel.registerInventory(
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description,  
    inv_image,
    inv_thumbnail,
    inv_price, 
    inv_miles, 
    inv_color,
    classification_id
  )
if (invResult) {
  req.flash(
    "notice",
    `Inventory Added Successfully.`
  )
  res.render("./inventory/add-inventory", 
  {title: "Adding Inventory", 
  nav,
  errors:null,
  classificationSelect})
} else {
  
  req.flash("notice", "Sorry, adding the inventory failed.")
  res.render("./inventory/add-inventory", 
    {title: "Adding Inventory", 
    nav,
    errors:null,
    classificationSelect})
  }
}


module.exports = invCont