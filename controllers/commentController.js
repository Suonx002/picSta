const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { checkErrorReqBody } = require('../validations/validators');

const pool = require('../database/pool');

const createComment = catchAsync(async (req, res, next) => {
  const postId = req.params.postId || req.body.post_id;
  const username = req.user.username;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [postId]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with this ID', 400));
  }

  let comment = await pool.query(
    'INSERT INTO comments(comment,username,post_id) VALUES($1,$2,$3) RETURNING *',
    [req.body.comment, username, postId]
  );

  comment = comment.rows[0];

  res.status(201).json({
    status: 'success',
    data: comment,
  });
});

const getCommentsByPostId = catchAsync(async (req, res, next) => {
  const postId = req.params.postId;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [postId]);

  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with this ID', 400));
  }

  let comments = await pool.query('SELECT * FROM comments WHERE post_id=$1', [
    post.post_id,
  ]);

  comments = comments.rows;

  if (!comments) {
    return next(new AppError('There are no comments for this post', 400));
  }

  res.status(200).json({
    status: 'success',
    data: comments,
  });
});

const getSingleComment = catchAsync(async (req, res, next) => {
  const { postId, commentId } = req.params;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [postId]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with this ID', 400));
  }

  let comment = await pool.query(
    'SELECT * FROM comments c LEFT JOIN posts p ON c.post_id=p.post_id WHERE c.comment_id=$1',
    [commentId]
  );
  comment = comment.rows[0];

  if (!comment) {
    return next(new AppError('There are no comment with this post', 400));
  }

  res.status(200).json({
    status: 'success',
    data: comment,
  });
});

module.exports = {
  createComment,
  getCommentsByPostId,
  getSingleComment,
};
