const mongoose = require('mongoose');
require('dotenv').config();

const config = process.env;

// Connection URI
const uri = config.MONGO_CONNECTION_URL;

async function dbConnection() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.Promise = global.Promise;
    console.log('Database Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = dbConnection;
