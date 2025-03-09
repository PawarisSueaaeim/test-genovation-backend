const express = require('express');
const { getBrands } = require('../controllers/vehicles');

const router = express.Router();

router.get("/vehicles/brands", getBrands);

module.exports = router;