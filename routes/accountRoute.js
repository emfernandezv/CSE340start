// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')
const utilities = require("../utilities")

// Route to build inventory by classification view

router.get("/login",  utilities.handleErrors(accountController.buildLogin));
router.get("/",  utilities.checkLogin, utilities.handleErrors(accountController.accountManagement))
router.get("/register", utilities.handleErrors(accountController.buildSignup));
router.get("/update/:accountId", utilities.checkLogin, utilities.handleErrors(accountController.buildEditAccount));

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

router.post(
  "/update",
  utilities.checkLogin, 
  regValidate.updateAccountRules(),
  regValidate.checkAccountUpdateData,
  utilities.handleErrors(accountController.updateAccount)
);

router.post(
  "/updatePassword",
  utilities.checkLogin, 
  regValidate.changePasswordRules(),
  regValidate.checkResetPasswordData,
  utilities.handleErrors(accountController.updateAccountPassword)
);

module.exports = router;