const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Classification Registration Data Validation Rules
 * ********************************* */
validate.ClassificationRules = () => {
    return [
      // firstname is required and must be string
      body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a classification name."), // on error this message is sent.
    ]
  }

  
  /* ******************************
 * Check data and return errors or continue to register the clasification
 * ***************************** */

  validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./inventory/add-classification", {
        errors,
        title: "Adding Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
  }

  

  /*  **********************************
 *  Inventory Registration Data Validation Rules
 * ********************************* */
validate.InventoryRules = () => {
  return [
    // make is required and must be string
    body("inv_make")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please make name."), // on error this message is sent.

    // model is required and must be string
    body("inv_model")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide model name."), // on error this message is sent.

    // valid year is required must be 4 digits
    body("inv_year")
    .trim()
    .isInt({min:1900, max:2025})//(new Date).getFullYear +1})
    .withMessage("Please provide a year."),

    // valid description is required 
    body("inv_description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a description."),

    // valid image is required 
    body("inv_image")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a image path."),

    // valid thumbnail is required 
    body("inv_thumbnail")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a thumbnail path."),

    // valid price is required 
    body("inv_price")
    .trim()
    .isInt({min:0})//(new Date).getFullYear +1})
    .withMessage("Please provide a price."),

    // valid miles is required 
    body("inv_miles")
    .trim()
    .isInt({min:0})//(new Date).getFullYear +1})
    .withMessage("Please provide mileage."),

    // valid color is required 
    body("inv_color")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a color."),

    // valid classification is required 
    body("classification_id")
    //.trim()
    //.notEmpty()
    .isInt({min:1})
    .withMessage("Please select a classification."),
  ]
}

  /* ******************************
 * Check data and return errors or continue to inventory registration
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let errors = []
    errors = validationResult(req)
    const classificationSelect = await utilities.buildClassificationSelect();
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./inventory/add-inventory", {
        classificationSelect,
        title: "Adding Inventory",
        nav,
        inv_make, 
        inv_model, 
        inv_year, 
        inv_description, 
        inv_image, 
        inv_thumbnail,
        inv_price, 
        inv_miles, 
        inv_color, 
        classification_id ,
        errors: null
      })
      return
    }
    next()
  }
  


  module.exports = validate