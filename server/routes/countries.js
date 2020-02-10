const express = require('express');
const router = express.Router();
const {  getCounties } = require('../db/api/countries');

/* GET city by ID from listing. */
router.get('/', function (req, res, next) { 
    getCounties()
        .then(countries => res.status(200).json({ countries }))
        .catch(error => res.status(500).json({ error: error.message }))
});
module.exports = router;