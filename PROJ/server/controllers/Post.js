const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const logger = require('../logger');

router.post('/create', async (req, res) => {
    const {content, threadId, userId} = req.body;
    const newPost = Post({
        content,
        createdAt: Date.now(),
        threadId,
        userId
    })
    logger.info('New post ' + newPost.content + ' created at ' + ' ' + Date.now());
    await newPost.save();
    res.send(newPost);

});


router.get('/thread/:id', async (req, res) => {
    const page = req.query.page;
    const perPage = 10;
    const posts = await Post.find({threadId: req.params.id}).limit(perPage);
    if(!posts){
        logger.error('No Posts found for this thread');
    }
    logger.info('Displaying Posts');
    res.send(posts);
});

module.exports = router;