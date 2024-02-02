const invModel = require("../models/inventory-model")
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
      ' vehicles" class="linkS">' +
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


/* **************************************
* Build the Log in view HTML

* ************************************ */
/*
Util.getLogin = async function (title) {
  let   form = '<div class="container">'
          form += '<div class="form-container">'
            form += '<form id="login">'
              form += '<h1>'+title+'</h1>'
              form += '  <input type="email" name="account_email" placeholder="Email">'
              form += '  <input type="password" name="account_password" placeholder="Password" id="pword">'
              form += '  <button type="submit">Sign In</button>'
              form += '  <p>No account? <a href="/account/register" >Register</a></p>'
            form += '</form>'
          form += '</div>'
        form += '</div>'
        
      return form
}
*/
/* **************************************
* Build the Register view HTML

* ************************************ */
/*
Util.getRegister = async function (title) {
  let   form = '<div class="container">'
          form += '<div class="form-container">'
            form += '<form id="register" action="/account/register" method="post">'
              form += '<h1>'+title+'</h1>'
              form += '  <input type="text" name="account_firstname" placeholder="First Name" required>'
              form += '  <input type="text" name="account_lastName" placeholder="Last Name"required>'
              form += '  <input type="email" name="account_email" placeholder="Email" required>'
              form += '  <input type="password" name="account_password" placeholder="Password" pattern="(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}" required>'
              form += '  <button type="submit">Register</button>'
              form += '  <p>Already have an account? <a href="/account/login" >Login</a></p>'
            form += '</form>'
          form += '</div>'
        form += '</div>'
        
      return form
}
*/

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
 

module.exports = Util