const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const pool = require('../database/pool');

const protectRoute = catchAsync(async (req, res, next) => {
  let token;

  // getting the token and check
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'You are not logged in to access this. PLease log in to get access.',
        401
      )
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  let currentUser = await pool.query(
    'SELECT username FROM users WHERE username=$1',
    [decoded.username]
  );

  currentUser = currentUser.rows[0];

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token is no longer exist', 401)
    );
  }

  req.user = currentUser;

  next();
});

const apiKey = catchAsync(async (req, res, next) => {
  let instagram_apikey;

  if (req.headers.instagram_apikey) {
    instagram_apikey = req.headers.instagram_apikey;
  }

  if (!instagram_apikey || instagram_apikey !== process.env.INSTAGRAM_APIKEY) {
    return next(new AppError('Failed to verify authorization', 401));
  }

  next();
});

module.exports = {
  protectRoute,
  apiKey,
};
