const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/reportController');

router.get('/', InventoryController.getInventoryReport);

module.exports = router;