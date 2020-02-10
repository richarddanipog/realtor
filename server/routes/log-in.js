const express = require('express');
const router = express.Router();
const { login } = require('../db/api/users');
const crypto = require('crypto')

router.post('/', function (req, res) {
    const { email, password } = req.body;
    const token = crypto.pbkdf2Sync(String(password), 'realtor', 10000, 64, 'sha512');
    const userPasswordHashed = token.toString('base64');
    console.log("user login => ",req.body)

    login(email, password)
        .then((user) => {
            console.log(user)
            res.cookie("user", JSON.stringify(user), { maxAge: 1000 * 60 * 60 * 24 });
            res.status(200).json(user);
        })
        .catch(error => res.status(401).json({ status: 401, error: "Invalid email or username" }))
});

module.exports = router;