const express = require('express');
const router = express.Router();
const passport = require('passport')

const postsController = require('../controllers/posts_controller');


router.post('/upload/:id',postsController.uploadPost)

module.exports = router;