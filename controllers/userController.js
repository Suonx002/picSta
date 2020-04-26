const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { hashPassword, comparePassword } = require('../validations/validators');

const User = require('../models/userModel');

const signToken = (username) => {
  const payload = { username };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.register = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  const { name, username, email, password } = req.body;
  const user = await User.findAll({
    where: {
      [Op.or]: [{ username }, { email }],
    },
    // attributes: { exclude: ['password'] },
  });

  if (user.length > 0) {
    // return res.status(400).json({
    //   status: 'fail',
    //   message: 'Username or email is taken, please try a different one!',
    // });
    return next(
      new AppError(
        'Username or email is taken, please try a different one.',
        400
      )
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  newUser.password = undefined;
  const token = signToken(newUser.username);

  res.status(201).json({
    status: 'success',
    token,
    user: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }
  const { password, email } = req.body;

  let user = await User.findOne({
    where: {
      email,
    },
    attributes: ['name', 'username', 'email', 'password', 'created_at'],
  });

  if (!user || !(await comparePassword(password, user.password))) {
    return next(new AppError('Email or password is incorrect', 401));
  }

  user.password = undefined;
  const token = signToken(user.username);

  res.status(200).json({
    status: 'success',
    token,
    user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  if (!users) {
    return res.status(400).json({
      status: 'fail',
      message: 'There are no users',
    });
  }

  res.status(200).json({
    status: 'success',
    users,
  });
});
