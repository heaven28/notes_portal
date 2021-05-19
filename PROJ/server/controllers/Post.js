const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/create', async (req, res) => {
    const {content, threadId, userId} = req.body;
    const newPost = Post({
        content,
        createdAt: Date.now(),
        threadId,
        userId
    })

    await newPost.save();
    res.send(newPost);

});


router.get('/thread/:id', async (req, res) => {
    const page = req.query.page;
    const perPage = 10;
    const posts = await Post.find({threadId: req.params.id}).limit(perPage);
    res.send(posts);
});

module.exports = router;