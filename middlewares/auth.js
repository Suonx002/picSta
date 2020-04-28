const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');

// const User = require('../models/userModel');
const pool = require('../database/pool');

exports.protectRoute = catchAsync(async (req, res, next) => {
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

  let currentUser = await pool.query(
    'SELECT username FROM users WHERE username=$1',
    [decoded.username]
  );

  currentUser = currentUser.rows[0];

  if (!currentUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'The user belonging to this token is no longer exist',
    });
  }

  req.user = currentUser;

  next();
});
