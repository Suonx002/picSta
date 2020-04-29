const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const { checkErrorReqBody } = require('../validations/validators');

const pool = require('../database/pool');

const getPosts = catchAsync(async (req, res, next) => {
  // get posts and order by created_at
  let posts = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  posts = posts.rows;

  if (!posts) {
    return next(new AppError('There are no posts', 400));
  }

  res.status(200).json({
    status: 'success',
    data: posts,
  });
});

const getPostById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [id]);

  post = post.rows[0];

  if (!post) {
    return next(new AppError('There is no post with this ID', 400));
  }

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

const createPost = catchAsync(async (req, res, next) => {
  checkErrorReqBody(req, res);

  const username = req.user.username;
  const { photo, description } = req.body;

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

  const id = req.params.id;
  const username = req.user.username;
  const { description } = req.body;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [id]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with the following id', 400));
  }

  // check if user and post_id match
  if (username !== post.username) {
    return next(new AppError('You are not allow to update this post', 401));
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

const deletePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const username = req.user.username;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [id]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with the following id', 400));
  }

  // check if user and post_id match
  if (username !== post.username) {
    return next(new AppError('You are not allow to delete this post', 401));
  }

  post = await pool.query('DELETE FROM posts WHERE post_id=$1', [id]);

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Post successfully deleted',
    },
  });
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
