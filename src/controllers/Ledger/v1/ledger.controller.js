const LedgerEntries = require('../../../models/LedgerEntries');

async function getLedgerEntries(req, res, next) {
  try {
    const ledgerEntries = await LedgerEntries.find({});

    const groupByDate = ledgerEntries.reduce((groupByDate, ledgerEntry) => {
      const d = ledgerEntry.ledgerEntryDate?.split('T')[0];

      groupByDate[d] = groupByDate[d] || [];
      groupByDate[d].push(ledgerEntry);
      return groupByDate;
    }, {});

    const finalFormatOfLedgerEntries = [];
    for (const [key, value] of Object.entries(groupByDate)) {
      const detailLedgerEntryObject = { date: key, expense: 0, income: 0, details: [] };
      value.reduce((previous, current) => {
        previous[current.ledgerType] =
          current.ledgerType === 'expense'
            ? parseInt(previous['expense']) + parseInt(current.amount)
            : parseInt(previous['income']) + parseInt(current.amount);
          previous.details.push(current);
          return previous;
      }, detailLedgerEntryObject);
      finalFormatOfLedgerEntries.push(detailLedgerEntryObject);
    }

    res.send(finalFormatOfLedgerEntries);
  } catch (error) {
    next({ statusCode: 404, status: error.message || 'Something went wrong' });
  }
}

async function postLedgerEntries(req, res, next) {
  try {
    // TODO: Need to pass the ledgerEntryDate from the UI so that user can choose the particular date for the entry
    const { amount, categoryName, description, ledgerType, ledgerEntryDate = new Date().toISOString() } =
      req.body.payload;
    const ledgerEntry = new LedgerEntries({
      amount,
      categoryName,
      description,
      ledgerType,
      ledgerEntryDate
    });
    await ledgerEntry.save();
    // TODO: Need to send the response received from the db call
    res.send(ledgerEntry);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLedgerEntries,
  postLedgerEntries
};
