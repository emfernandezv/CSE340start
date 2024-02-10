const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
        [classification_id]
      )
      return data.rows
    } catch (error) {
      console.error("getclassificationsbyid error " + error)
    }
  }

  /* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      WHERE i.inv_id = $1`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("inv_id error " + error)
  }
}

/* *****************************
*   Register new classification
* *************************** */
async function registerClassification(classification_name){
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Register new Inventory
* *************************** */
async function registerInventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id){
  try {
    const data = await pool.query(
      `INSERT INTO public.inventory (
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
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("add Inventory error: " + error)
    return error.message
  }
}
/* *****************************
*   edit Inventory
* *************************** */
async function updateInventory (inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id){
  try {
    const data = await pool.query(
      ` UPDATE public.inventory 
        SET   inv_make = $1, 
              inv_model = $2, 
              inv_description = $3, 
              inv_image = $4, 
              inv_thumbnail = $5, 
              inv_price = $6, 
              inv_year = $7, 
              inv_miles = $8, 
              inv_color = $9, 
              classification_id = $10 
        WHERE inv_id = $11 RETURNING *`,
      [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id, inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("update inventory error: " + error)
    return error.message
  }
}

/* *****************************
*   delete Inventory
* *************************** */
async function deleteInventory (inv_id){
  try {
    const data = await pool.query(
      ` DELETE FROM public.inventory 
        WHERE inv_id = $1 RETURNING *`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("delete inventory error: " + error)
    return error.message
  }
}



module.exports = {getClassifications, getInventoryByClassificationId, getInventoryById, registerClassification, registerInventory, updateInventory, deleteInventory};