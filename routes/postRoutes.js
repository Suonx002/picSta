const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');

const {
  checkCreatePost,
  checkUpdatePost,
} = require('../validations/validators');

router
  .route('/')
  .post(checkCreatePost, auth.protectRoute, postController.createPost);

router
  .route('/:id')
  .put(checkUpdatePost, auth.protectRoute, postController.updatePost)
  .delete(auth.protectRoute, postController.deletePost);

module.exports = router;
