const express = require('express');
const router = express.Router();

const commentRoute = require('./commentRoutes');
const likeRoute = require('./likeRoutes');

const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');
const multerController = require('../controllers/multerController');

const {
  checkCreatePost,
  checkUpdatePost,
} = require('../validations/validators');

// middleware for comments
router.use('/:postId/comments', commentRoute);

// middleware for likes
router.use('/:postId/likes', likeRoute);

router
  .route('/')
  .get(postController.getPosts)
  .post(
    auth.protectRoute,
    multerController.single('photo'),
    postController.createPost
  );

router
  .route('/:postId')
  .get(postController.getPostById)
  .put(auth.protectRoute, checkUpdatePost, postController.updatePost)
  .delete(auth.protectRoute, postController.deletePost);

module.exports = router;
