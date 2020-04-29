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
  .get(postController.getPosts)
  .post(checkCreatePost, auth.protectRoute, postController.createPost);

router
  .route('/:id')
  .get(postController.getPostById)
  .put(checkUpdatePost, auth.protectRoute, postController.updatePost)
  .delete(auth.protectRoute, postController.deletePost);

module.exports = router;
