const express = require('express');
const router = express.Router();
const { addUser } = require('../db/api/users');
const crypto = require('crypto')

router.post('/', function (req, res) {
    const { fullName,email, phone,password } = req.body;
    const token = crypto.pbkdf2Sync(String(password), 'realtor', 10000, 64, 'sha512');
    const userPasswordHashed = token.toString('base64');
    console.log("user signup => ",req.body)

});

module.exports = router;