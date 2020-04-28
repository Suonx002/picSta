const { validationResult } = require('express-validator');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// const Post = require('../models/postModel');
// const User = require('../models/userModel');

// const { Post, User } = require('../models');

exports.createPost = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      errors: errors.array(),
    });
  }

  const { username } = req.user;
  const { photo, description } = req.body;

  const user = await User.findOne({
    where: {
      username,
    },
    attributes: ['name', 'username', 'email', 'created_at'],
  });

  if (!user) {
    next(new AppError('You are not allow to post', 401));
  }

  const post = await Post.create({
    photo,
    description,
  });

  res.status(201).json({
    status: 'success',
    post,
    user,
  });
});
