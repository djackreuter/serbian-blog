const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Post } = require('../../models/Post');
const { uploadImage } = require('../../utils/uploadImage');
const { validatePostInput } = require('../../validation/post');
const sendEmail = require('../../utils/sendEmail');

/**
 * @route  GET api/posts/
 * @desc   get all posts
 * @access public
 */
router.get('/', async (req, res) => {
  let errors = {};
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .sort({ date: 'desc' });
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
  let errors = {};
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
        image = await uploadImage(req.body.image);
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
 * @route PATCH api/posts/:id
 * @desc update a post
 * @access private
 */
router.patch('/:id', passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    let errors = {};
    try {
      const post = await Post.findById(req.params.id)
        .populate('author', '_id');
      if (!post) {
        errors.nopost = "Post not found";
        return res.status(404).json(errors);
      }
      if (req.user.id.toString() !== post.author._id.toString()) {
        errors.notauthorized = "You dont have permission to edit this post";
        return res.status(401).json(errors);
      }
      if (req.body.title) post.title = req.body.title;
      if (req.body.body) post.body = req.body.body;
      if (req.body.image) post.image = await uploadImage(req.body.image);
      const updatedPost = await post.save();
      return res.json(updatedPost);
    } catch (err) {
      return res.status(400).send(err);
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
 * @route  POST api/posts/like/:id
 * @desc   like post
 * @access private
 */
router.post('/like/:postId', passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({msg: 'Post not found'});
      }
      const index = post.likes.findIndex((value) => value.user == req.user.id);
      if (index === -1) {
        post.likes.push({ user: req.user.id });
        } else {
          post.likes.splice(index, 1);
        }
      const savedPost = await post.save();
      return res.json(savedPost);
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
      name: req.body.name,
      image: req.body.image
    };
    post.comments.unshift(comment);
    savedPost = await post.save();
    await sendEmail(post.title);
    return res.json(savedPost);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * @route  DELETE api/posts/:id/comment/:commentId
 * @desc   like post
 * @access private
 */
router.delete('/:id/comment/:commentId', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.findById(req.params.id).then((post) => {
    const commentToDelete = post.comments.find((comment) => comment._id == req.params.commentId);
    if (req.user.admin !== true) {
      return res.status(401).json({cannotdelete: 'You don\'t have permission to delete this comment'});
    }
    if (post.comments.filter((comment) => comment._id == req.params.commentId).length === 0) {
      return res.status(404).json({commentnotexists: 'Comment does not exist'});
    }
    const index = post.comments.indexOf(commentToDelete);
    post.comments.splice(index, 1);
    post.save().then((post) => res.json(post));
  }).catch((err) => res.status(404).json({postnotfound: 'No post found', err}));
});



module.exports = router;