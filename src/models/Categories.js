const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: String,
  icon: String,
  name: String,
  type: String
});

module.exports = mongoose.model('Categories', schema);
