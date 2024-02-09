const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}


/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page" class="linkS">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles" class="links">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML

* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" ></a>'
        grid += '<div class="namePrice">'
        grid += '<hr>'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* **************************************
* Build the Detail view HTML

* ************************************ */
Util.buildInventoryDetail = async function(data){
  let detail
  if(data.length > 0){
      detail = '<div id="inv-detail">'
      detail += '<img src="' + data[0].inv_image+'" alt="Image of '+ data[0].inv_make + ' ' + data[0].inv_model +'" >'
      detail += '<h2 >'+data[0].inv_make+' '+data[0].inv_model+' Details</h2>'
      detail += '<div id="inv-det">'
        detail += '<p ><strong>Price: $</strong>'+ new Intl.NumberFormat('en-US').format(data[0].inv_price)+'</p>'
        detail += '<p ><strong>Color: </strong>'+data[0].inv_color+'</p>'
        detail += '<p ><strong>Miles: </strong>'+data[0].inv_miles+'</p>'
      detail += '</div>'
      detail += '<div id="inv-desc">'
      detail += '<p ><strong>Description: </strong>'+data[0].inv_description+'</p>'
      detail += '</div>'
      detail += '</div>'
  }else { 
      detail += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return detail
}

Util.buildClassificationSelect = async function(selected_id = ""){
  let block;
  let data = await invModel.getClassifications()
  if (data.rowCount > 0){
    block = '<br>'
    block +=  '<select id="classificationList" name="classification_id" class="AddInput">';
    block += '<option value="" class="AddInput" >Select..</option>'
    data.rows.forEach((row) => {
      selected = (row.classification_id == selected_id)?"selected":""
      block += '<option class="AddInput" value="'+row.classification_id+'" '+selected+' >'
      block += row.classification_name
      block += '</option>'
    })
    block += '</select>';
  }else{
    block = '<p class="notice">There was an error trying to retrieve the classification list. Please try again.</p>'
  }
  return block;
};

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

/* Get list of classifications */
 Util.buildGetClassification = async function(req, res, next){
  let data = await invModel.getClassifications()
  if (data.rowCount > 0){
    return data.rows
  } 
}


/* Get list of classifications */
Util.buildGetInventory = async function(data){
  let data1 = await invModel.getInventoryById(data)
  
  if (data1){
    return data1[0]
  } 
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
 

module.exports = Util