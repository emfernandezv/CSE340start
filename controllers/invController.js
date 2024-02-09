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
invCont.buildManagementView  = async function(req, res){
  const nav = await utilities.getNav()
  const classifications = await utilities.buildGetClassification()
  res.render("./inventory/management", 
    {title: "Management", 
    nav,
    classifications,
  errors: null})
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

/* Build add inventory view*/
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

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* Build edit inventory view*/
invCont.DislayInventoryEditView = async function(req, res){
  let inv_id = req.params.inv_id
  const nav = await utilities.getNav()
  const itemData = await utilities.buildGetInventory(inv_id);
  const classificationSelect = await utilities.buildClassificationSelect(itemData.classification_id);
  const title = `Edit ${itemData.inv_make} ${itemData.inv_model}`
  res.render("inventory/edit-inventory", 
    {title: title, 
    nav,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id,
    classificationSelect,
    errors:null})
}


module.exports = invCont