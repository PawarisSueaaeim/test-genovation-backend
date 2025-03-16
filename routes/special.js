const express = require('express');
const { auth } = require('../middleware/auth');
const { getSpecial } = require('../controllers/special');


const router = express.Router();

router.get('/getSpecials', auth, getSpecial);

module.exports = router;