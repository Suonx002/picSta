const express = require('express');
const router = express.Router();

const {
  protectRoute,
  checkRegister,
  checkLogin,
} = require('../validations/validators');
const userController = require('../controllers/userController');

// register route
router.post('/register', checkRegister, userController.register);

// login route
router.post('/login', checkLogin, userController.login);

// find all users
router.route('/').get(protectRoute, userController.getAllUsers);

module.exports = router;
