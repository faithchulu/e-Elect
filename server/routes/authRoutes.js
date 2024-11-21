const express = require('express');
const { registerAdmin, loginAdmin } = require('../services/authServices');

const router = express.Router();

router.post('/signup', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;
