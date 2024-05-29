const express = require('express')
const registerVoterController = require('../controllers/VoterController')


const router = express.Router();

router.post('/register', registerVoterController);

module.exports = router;


