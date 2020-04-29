const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { checkErrorReqBody } = require('../validations/validators');

const pool = require('../database/pool');

const createComment = catchAsync(async (req, res, next) => {
  const postId = req.params.id || req.body.post_id;
  const username = req.user.username;

  let post = await pool.query('SELECT * FROM posts WHERE post_id=$1', [postId]);
  post = post.rows[0];

  if (!post) {
    return next(new AppError('Post is not found with this ID', 400));
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

module.exports = {
  createComment,
};
