const express = require('express');
const router = express.Router();

const { checkEmail } = require('../validations/validators');
const userController = require('../controllers/userController');

router.post('/register', checkEmail, userController.register);

module.exports = router;
