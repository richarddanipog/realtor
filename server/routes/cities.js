const express = require('express');
const router = express.Router();
const {  byId,getCities } = require('../db/api/cities');

/* GET city by ID from listing. */
router.get('/:id', function (req, res, next) { 
    byId(req.params.id)
        .then(city => res.status(200).json({ city }))
        .catch(error => res.status(500).json({ error: error.message }))
});


router.get('/', function (req, res, next) { 
    getCities()
        .then(cities => res.status(200).json({ cities }))
        .catch(error => res.status(500).json({ error: error.message }))
});
module.exports = router;