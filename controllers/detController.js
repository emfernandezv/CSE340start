const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const invCont = {}

/* ***************************
 *  Build inventory detail view
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


module.exports = invCont