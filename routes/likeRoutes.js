const express = require('express');
const router = express.Router({
  mergeParams: true,
});

const auth = require('../middlewares/auth');
const likeController = require('../controllers/likeController');

router
  .route('/')
  .get(likeController.getLikes)
  .post(auth.protectRoute, likeController.createLike)
  .delete(auth.protectRoute, likeController.deleteLike);

module.exports = router;
