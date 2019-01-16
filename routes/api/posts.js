const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Post } = require('../../models/Post');
const { uploadImage } = require('../../utils/uploadImage');
const { validatePostInput } = require('../../validation/post');

/**
 * @route  GET api/posts/
 * @desc   get all posts
 * @access public
 */
router.get('/', async (req, res) => {
  let errors = {};
  try {
    const posts = await Post.find().populate('author', 'name');
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
    const post = await Post.findById(req.params.id).populate('author', 'name');
    if (!post) {
      errors.nopost = 'Post not found';
      return res.status(404).json(errors);
    }
    return res.json(post);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route  POST api/posts
 * @desc   create a new post
 * @access private
 */
router.post('/', passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      let image;
      if (req.body.image) {
        image = JSON.stringify(await uploadImage(req.body.image));
      }
      const newPost = new Post({
        title: req.body.title,
        author: req.user.id,
        body: req.body.body,
        image
      });
      const post = await newPost.save();
      return res.json(post);
    } catch (err) {
      return res.status(400).json(err);
    }
});

/**
 * @route  DELETE api/posts
 * @desc   delete a post
 * @access private
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      return res.json({success: true});
    } catch (err) {
      return res.status(400).json(err);
    }
});

/**
 * @route POST api/posts/:id/comment
 * @desc comment on a post
 * @access private
 */
router.post('/:id/comment', passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');
    const comment = {
      text: req.body.text,
      name: req.user.name
    };
    post.comments.unshift(comment);
    savedPost = await post.save();
    return res.json(savedPost);
  } catch (err) {
    return res.status(400).json(err);
  }
});



module.exports = router;