const express = require('express');
const router = express.Router();

const { checkRegister, checkLogin } = require('../validations/validators');
const userController = require('../controllers/userController');

// register route
router.post('/register', checkRegister, userController.register);

// login route
router.post('/login', checkLogin, userController.login);

module.exports = router;
