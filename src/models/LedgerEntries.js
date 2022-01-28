const mongoose = require('mongoose');

const schema = mongoose.Schema({
  amount: String,
  categoryName: String,
  description: String,
  ledgerType: String,
  ledgerEntryDate: String
});

module.exports = mongoose.model('LedgerEntries', schema);
