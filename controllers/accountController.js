const accountModel = require("../models/accountModel")
const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const accountCont = {}

/* ****************************************
*  Deliver login view
* *************************************** */
accountCont.buildLogin = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }
/* ****************************************
*  Deliver registration view
* *************************************** */
accountCont.buildSignup = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
}

/* ***************************
 *  Account Management
 * ************************** */
accountCont.accountManagement = async function (req, res, next) {
    //const account_id = req.params.accountId
    //const data = await accountModel.getAccountById(account_id)
    let nav = await utilities.getNav()
    
    res.render("account/management", {
      title: "Account Management",
      nav,
      errors: null,
    })
  }

/* ***************************
 *  Register Account
 * ************************** */
accountCont.registerAccount = async function(req, res, next){
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    
    // Hash the password before storing
    let hashedPassword
    try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
    })
    }
    const regResult = await accountModel.registerAccount(
        account_firstname,
        account_lastname,
        account_email,
        hashedPassword
    )
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
}

  /* ****************************************
 *  Process login request
 * ************************************ */
accountCont.accountLogin = async function (req, res) {
    let nav = await utilities.getNav()
    const { account_email, account_password } = req.body
    const accountData = await accountModel.getAccountByEmail(account_email)
    if (!accountData) {
     req.flash("notice", "Please check your credentials and try again.")
     res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
     })
    return
    }
    try {
     if (await bcrypt.compare(account_password, accountData.account_password)) {
     delete accountData.account_password
     const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
     res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
     req.flash("notice", "You have successfully Logged in! ")
     return res.redirect("/account/")
     }
    } catch (error) {
     return new Error('Access Forbidden')
    }
   }

/* ***************************
 *  Build Edit Account View
 * ************************** */
accountCont.buildEditAccount = async function (req, res, next) {
  const account_id = parseInt(req.params.accountId);
  let nav = await utilities.getNav();
  const data = await accountModel.getAccountById(account_id);
  const accountData = data[0];

  res.render("./account/edit-account", {
    title: "Edit Account",
    nav,
    errors: null,
    account_id: accountData.account_id,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email
  });
};

/* ***************************
 *  Update Account
 * ************************** */
accountCont.updateAccount = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    account_id,
    account_firstname,
    account_lastname,
    account_email,
  } = req.body;

  const updateResult = await accountModel.updateAccount(
    account_id,
    account_firstname,
    account_lastname,
    account_email,
  );

  if (updateResult) {
    req.flash("notice", "Account Updated Successfully.");
    res.redirect("/account/");
  } else {
    req.flash("notice", "Sorry, the update failed.");
    res.render("./account/edit-account", {
      title: "Edit Account",
      nav,
      errors: null,
      account_id,
      account_firstname,
      account_lastname,
      account_email
    });
  }
};

/* ***************************
 *  Update Account Password
 * ************************** */
accountCont.updateAccountPassword = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    account_id,
    account_password,
  } = req.body;

  // Hash the password before storing
  let hashedPassword
  try {
  // regular password and cost (salt is generated automatically)
  hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
  req.flash("notice", 'Sorry, there was an error processing the registration.')
  res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
  })
  }
  const updateResult = await accountModel.updateAccountPassword(
    account_id,
    hashedPassword,
  );

  if (updateResult) {
    req.flash("notice", "Password Updated Successfully.");
    res.redirect("/account/");
  } else {
    req.flash("notice", "Sorry, the update failed.");
    res.render("./account/edit-account", {
      title: "Edit Account",
      nav,
      errors: null,
      account_id,
      account_firstname: updateResult.account_firstname,
      account_lastname: updateResult.account_lastname,
      account_email: updateResult.account_email,
    });
  }
};



module.exports = accountCont