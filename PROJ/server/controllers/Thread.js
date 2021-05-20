const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');
const logger = require('../logger');

router.post('/create', async (req, res) => {
    const {title, content, forumId, userId} = req.body;
    const newThread = Thread({
        title,
        content,
        createdAt: Date.now(),
        forumId,
        userId
    })
    logger.info('New Thread ' + newThread.title + ' created at ' + ' ' + Date.now());
    await newThread.save();
    res.send(newThread);

});

router.get('/:id', async (req, res) => {
    const thread = await Thread.findById(req.params.id);
    if(!thread){
        logger.error('No Thread found');
        res.status(404).send({
            message: 'Thread not found'
        });
        return;
    }
    logger.info('Thread ' + thread.title + ' found');
    res.send(thread);

});

router.get('/forum/:id', async (req, res) => {
    const threads = await Thread.find({forumId: req.params.id});
    logger.info('Displaying threads');
    res.send(threads);
});

module.exports = router;