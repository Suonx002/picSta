const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');

exports.protectRoute = async (req, res, next) => {
  try {
    let token;

    // getting the token and check
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message:
          'You are not logged in to access this. PLease log in to get access.',
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findOne({
      where: {
        username: decoded.username,
      },
    });

    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token is no longer exist',
      });
    }

    req.user = currentUser;

    next();
  } catch (err) {
    console.error(err.name);
  }
};

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
