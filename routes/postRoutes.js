const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');

const { checkCreatePost } = require('../validations/validators');

router
  .route('/')
  .post(auth.protectRoute, checkCreatePost, postController.createPost);

module.exports = router;
