const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth.middleware');

const {
  getCategories,
  postCategories
} = require('../controllers/Categories/v1/categories.controller');

const {
  getLedgerEntries,
  postLedgerEntries
} = require('../controllers/Ledger/v1/ledger.controller');

const { createUser, login } = require('../controllers/user/v1/user.controller');

router.get('/categories', verifyToken, getCategories);
router.post('/categories', verifyToken, postCategories);
router.post('/ledgerentries', verifyToken, postLedgerEntries);
router.get('/ledgerentries', verifyToken, getLedgerEntries);
router.post('/register', createUser);
router.post('/login', login);

module.exports = router;
