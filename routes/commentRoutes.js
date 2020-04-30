const express = require('express');

const router = express.Router({
  mergeParams: true,
});

const auth = require('../middlewares/auth');
const commentController = require('../controllers/commentController');
const {
  checkCreateComment,
  checkUpdateComment,
} = require('../validations/validators');

router
  .route('/')
  .get(commentController.getCommentsByPostId)
  .post(auth.protectRoute, checkCreateComment, commentController.createComment);

router
  .route('/:commentId')
  .get(commentController.getSingleComment)
  .put(auth.protectRoute, checkUpdateComment, commentController.updateComment);

module.exports = router;
