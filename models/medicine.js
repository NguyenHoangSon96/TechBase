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
}, { timestamps: true });
medicineSchema.index({ name: 1 });

const Medicine = mongoose.model('medicine', medicineSchema);

module.exports = Medicine;
