// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require('../controllers/accountController')
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')


// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//Route to default accounts
router.get("/", utilities.checkJWTToken, utilities.handleErrors(accountController.accountManagement))

// Process the login attempt
router.post(
  "/login",
 regValidate.Login(),
 regValidate.checkLogData,
 utilities.handleErrors(accountController.accountLogin)
)

router.get("/register", utilities.handleErrors(accountController.buildRegister));

//router.post('/register', utilities.handleErrors(accountController.registerAccount))
// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )


module.exports = router;