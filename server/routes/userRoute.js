const express = require('express');
const { register, login, allUsers } = require('../controller/userController');
const auth = require('../middleware/auth');

const router = express.Router();
router.route("/").post(register).get(auth,allUsers)
router.route("/login").post(login);

module.exports = router;