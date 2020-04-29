const express = require('express');
const router = express.Router();

const commentRoute = require('./commentRoutes');

const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');

const {
  checkCreatePost,
  checkUpdatePost,
} = require('../validations/validators');

// middleware for comment
router.use('/:postId/comments', commentRoute);

router
  .route('/')
  .get(postController.getPosts)
  .post(auth.protectRoute, checkCreatePost, postController.createPost);

router
  .route('/:postId')
  .get(postController.getPostById)
  .put(auth.protectRoute, checkUpdatePost, postController.updatePost)
  .delete(auth.protectRoute, postController.deletePost);

module.exports = router;
