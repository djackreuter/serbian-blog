const express = require('express');
const router = express.Router();
const { Post } = require('../../models/Post');

/**
 * @route  GET api/posts/
 * @desc   get all posts
 * @access public
 */
router.get('/', async (req, res) => {
  let errors = {};
  try {
    const posts = await Post.find().populate('user', 'name');
    if (!posts) {
      errors.noposts = 'There are currently no posts';
      return res.status(404).json(errors);
    }
    return res.json(posts);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route  GET api/posts/:id
 * @desc   get post by id
 * @access public
 */
router.get('/:id', async (req, res) => {
  errors = {};
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name');
    if (!post) {
      errors.nopost = 'Post not found';
      return res.status(404).json(errors);
    }
    return res.json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;