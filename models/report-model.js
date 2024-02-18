const pool = require("../database/")

const repModel = {}

/* ***************************
 *  Get all inventory
 * ************************** */
repModel.getInventoryReport = async function () {
    try {
      const data = await pool.query(
        `SELECT   C.classification_id,
                  C.classification_name,
                  I.inv_id,
                  I.inv_make,
                  I.inv_model,
                  I.inv_year,
                  I.inv_thumbnail
        FROM      public.inventory as I
                  INNER JOIN public.classification as C
                    ON I.classification_id = C.classification_id
        ORDER BY  C.classification_id,
                  I.inv_make, 
                  I.inv_year;`
      )
      return data.rows
    } catch (error) {
      console.error("getclassificationsbyid error " + error)
    }
  }

  module.exports = repModel;

  