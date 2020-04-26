const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

exports.comparePassword = async (candidatePassword, databasePassword) => {
  return await bcrypt.compare(candidatePassword, databasePassword);
};

exports.checkRegister = [
  check('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  check('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),
  check('email')
    .isLength({ min: 3 })
    .withMessage('Email must be at least 3 characters'),
  check('email').isEmail().withMessage('Email must be valid'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters'),
];

exports.checkLogin = [
  check('email').not().isEmpty().withMessage('Email cannot be empty'),
  check('email').isEmail().withMessage('Email must be valid'),
  check('password').not().isEmpty().withMessage('Password cannot be empty'),
];
