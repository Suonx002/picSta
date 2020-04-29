const { validationResult } = require('express-validator');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const pool = require('../database/pool');

const checkErrorReqBody = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  // next();
};

const createPost = catchAsync(async (req, res, next) => {
  checkErrorReqBody(req, res);

  const username = req.user.username;
  const { photo, description } = req.body;

  if (!username) {
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

const updatePost = catchAsync(async (req, res, next) => {
  checkErrorReqBody(req, res);

  const username = req.user.username;
  const id = req.params.id;
  const { description } = req.body;

  if (!username) {
    next(new AppError('You are not allow to update post for this user', 401));
  }

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [id]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with the following id', 400));
  }

  // check if user and post_id match
  if (username !== post.username) {
    return next(
      new AppError('You are not allow to update post for this user', 401)
    );
  }

  post = await pool.query(
    'UPDATE posts SET description=$1 WHERE post_id=$2 RETURNING *',
    [description, id]
  );
  post = post.rows[0];

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

module.exports = {
  createPost,
  updatePost,
};
