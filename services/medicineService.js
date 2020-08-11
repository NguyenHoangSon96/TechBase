const Medicine = require('../models/medicine');

async function addOrUpdateMedicine(medicine) {
  await Medicine.updateOne({ name: medicine.name }, medicine, { upsert: true });
};

async function removeMedicineByName(medicineName) {
  console.log('son' + medicineName);
  const result = await Medicine.deleteOne({ name: medicineName });
  if (!result.deletedCount) {
    throw Error('Medicine name not exist');
  }
};

module.exports = {
  addOrUpdateMedicine,
  removeMedicineByName
};
