var express = require('express');
var router = express.Router();

// Load the appropriate controller
const housingController = require('../controllers/housingController');

// Routes for housing
router.get('/:houseId?', housingController.getHouse);
router.post('/', housingController.addHouse);
//router.delete('/:houseId', housingController.deleteHouse);
//router.put('/:houseId', housingController.updateHouse);
// router.delete('/:houseId/permanent', housingController.permanentDelete);

module.exports = router;
