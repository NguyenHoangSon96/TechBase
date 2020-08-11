const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');

const medicineValidator = require('../schemaValidators/medicineValidator');
const { addOrUpdateMedicineController, removeMedicineByNameController } = require('../controllers/medicineController');

router.post('/save', checkSchema(medicineValidator), addOrUpdateMedicineController);
router.get('/remove-by-name', removeMedicineByNameController);

module.exports = router;
