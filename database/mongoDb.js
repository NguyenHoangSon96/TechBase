const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URL;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  await mongoose.connect(uri, options);
  console.log(`Connect mongo success port:${process.env.MONGO_URL}`);
}

module.exports = {
  connectDB,
};
