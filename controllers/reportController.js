const InventoryModel = require('../models/report-model');
const utilities = require("../utilities/")
const reportCont = {}

reportCont.getInventoryReport = async function (req, res) {
        try {
            const inventoryReport = await InventoryModel.getInventoryReport();
            let nav = await utilities.getNav()
            const className = "Inventory Report by classification"
            res.render('./report/inventoryReport', 
            {   title: className ,
                nav,
                errors: null,
                inventoryReport
            });
        } catch (error) {
            console.error('Error fetching inventory report:', error);
            res.status(500).send('Internal Server Error');
        }
    }


module.exports = reportCont;
