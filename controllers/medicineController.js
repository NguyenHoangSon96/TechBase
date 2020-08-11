const { addOrUpdateMedicine, removeMedicineByName, findMedicineByName } = require('../services/medicineService');
const { validationResult } = require('express-validator');


async function addOrUpdateMedicineController(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await addOrUpdateMedicine(req.body);
    res.send('Add new medicine success');
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function removeMedicineByNameController(req, res) {
  try {
    await removeMedicineByName(req.query.name);
    res.send('Remove medicine success');
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function findMedicineByNameController(req, res) {
  try {
    const results = await findMedicineByName(req.query.name);
    res.json(results);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

module.exports = {
  addOrUpdateMedicineController,
  removeMedicineByNameController,
  findMedicineByNameController
}
