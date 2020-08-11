const mongoose = require('mongoose');

async function connectDB() {
  const uri = 'mongodb://localhost:27017/techbase';
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  await mongoose.connect(uri, options);
  console.log('Connect mongo success');
}

module.exports = {
  connectDB,
};
