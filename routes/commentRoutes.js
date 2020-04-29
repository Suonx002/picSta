const express = require('express');
const router = express.Router({
  mergeParams: true,
});

const auth = require('../middlewares/auth');
const commentController = require('../controllers/commentController');
const { checkCreateComment } = require('../validations/validators');

router
  .route('/')
  .post(auth.protectRoute, checkCreateComment, commentController.createComment);

module.exports = router;
