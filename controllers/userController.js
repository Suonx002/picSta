// const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  trimAndLowercase,
  checkErrorReqBody,
  hashPassword,
  comparePassword,
} = require('../validations/validators');

// const User = require('../models/userModel');

const pool = require('../database/pool');

const signToken = (username) => {
  const payload = { username };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.register = catchAsync(async (req, res, next) => {
  checkErrorReqBody(req, res);

  let { name, username, email, password } = req.body;

  // trim and lowercase inputs
  name = trimAndLowercase(name);
  username = trimAndLowercase(username);
  email = trimAndLowercase(email);

  // hashing password
  password = await hashPassword(password);

  let user = await pool.query(
    'INSERT INTO users(name,username,email,password) VALUES($1, $2, $3, $4) RETURNING name,username,email,created_at',
    [name, username, email, password]
  );

  user = user.rows[0];

  const token = signToken(user.username);

  res.status(200).json({
    status: 'success',
    token,
    data: user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  checkErrorReqBody(req, res);

  let { password, email } = req.body;

  // lowercase email
  email = trimAndLowercase(email);

  let user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

  user = user.rows[0];

  // check if user exist in databse
  if (!user) {
    return next(new AppError('Email or password is incorrect', 401));
  }

  if (!(await comparePassword(password, user.password))) {
    return next(new AppError('Email or password is incorrect', 401));
  }

  const token = signToken(user.username);

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let user = await pool.query(
    'SELECT name,username,email,created_at FROM users'
  );

  user = user.rows;

  res.status(200).json({
    status: 'success',
    data: user,
  });
});
