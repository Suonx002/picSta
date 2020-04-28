const { validationResult } = require('express-validator');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const pool = require('../database/pool');

exports.createPost = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  const { photo, description, username } = req.body;

  if (username !== req.user.username) {
    console.log('in here');
    next(new AppError('You are not allow to create post for this user', 401));
  }

  let post = await pool.query(
    'INSERT INTO posts(photo, description,username) VALUES($1, $2, $3) RETURNING photo,description,username,created_at',
    [photo, description, username]
  );

  post = post.rows[0];

  res.status(201).json({
    status: 'success',
    data: post,
  });
});
