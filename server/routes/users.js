const express = require('express');
const router = express.Router();
const {addUser,getAllUsers} =require('../db/api/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  getAllUsers()
  .then(users => res.status(200).json({ users }))
});

router.post('/', (req, res) => {
    addUser(req.body)
    .then(user => res.status(200).json({ user }))
        .catch(error => res.status(500).json({ error: error.message }))
})
module.exports = router;
