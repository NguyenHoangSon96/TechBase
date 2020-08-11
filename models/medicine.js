const mongoose = require('mongoose');

const { Schema } = mongoose;

const medicineSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: Number,
  expiredDate: Date,
  amount: Number,
  unit: {
    type: String,
    enum: ['BOX', 'JAR', 'BLISTER PACKS'],
    default: 'BOX'
  },
  note: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
medicineSchema.index({ name: 1 });

const Medicine = mongoose.model('medicine', medicineSchema);

module.exports = Medicine;
