const pool = require('../database/pool');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getLikes = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [postId]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with this ID', 400));
  }

  let likes = await pool.query('SELECT * FROM likes_post WHERE post_id=$1', [
    postId,
  ]);

  likes = likes.rows;

  //   Don't to check this for table since it return empty array if nothing there

  //   if (!likes) {
  //     return next(new AppError('There are no likes for this post', 400));
  //   }

  res.status(200).json({
    status: 'success',
    data: likes,
  });
});

const createLike = catchAsync(async (req, res, next) => {
  const { username } = req.user;
  const { postId } = req.params;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [postId]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with this ID', 400));
  }

  // checking if like is already liked by this user
  let findLike = await pool.query(
    'SELECT * FROM likes_post WHERE post_id=$1 AND username=$2',
    [postId, username]
  );
  findLike = findLike.rows[0];

  if (findLike && findLike.username === username) {
    return next(new AppError('User already liked this post', 400));
  }

  // if it doesn't exist, create one
  let like = await pool.query(
    'INSERT INTO likes_post(post_id, username) VALUES($1,$2)',
    [postId, username]
  );
  like = like.rows[0];

  res.status(200).json({
    status: 'success',
    data: {
      message: 'Successfully liked this post!',
    },
  });
});

const deleteLike = catchAsync(async (req, res, next) => {
  const { username } = req.user;
  const { postId } = req.params;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [postId]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('There are no post with this ID', 400));
  }

  let findLike = await pool.query(
    'SELECT * FROM likes_post WHERE post_id=$1 AND username=$2',
    [postId, username]
  );
  findLike = findLike.rows[0];

  if (findLike && findLike.username === username) {
    let like = await pool.query(
      'DELETE FROM likes_post WHERE post_id=$1 AND username=$2',
      [postId, username]
    );

    like = like.rows[0];

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Successfully unliked this post!',
      },
    });
  }

  if (!findLike) {
    return next(new AppError(`You haven't like this post`, 400));
  }
});

module.exports = {
  getLikes,
  createLike,
  deleteLike,
};
