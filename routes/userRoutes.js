const express = require('express');
const router = express.Router();

const { checkRegister, checkLogin } = require('../validations/validators');

const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// register route
router.post('/register', checkRegister, userController.register);

// login route
router.post('/login', checkLogin, userController.login);

// find all users
router.route('/').get(auth.protectRoute, userController.getAllUsers);

module.exports = router;
