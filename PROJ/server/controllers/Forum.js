const express = require('express');
const logger = require('../logger');
const router = express.Router();
const Forum = require('../models/Forum');

router.post('/create', async (req, res) => {
    const {title, categoryId} = req.body;
    const newForum = Forum({
        title,
        createdAt: Date.now(),
        categoryId
    })
    logger.info('New forum ' + newForum.title + ' created at ' + ' ' + Date.now());
    await newForum.save();
    res.send(newForum);

});

router.get('/:id', async (req, res) => {
    const forum = await Forum.findById(req.params.id);
    if(!forum){
        logger.error('No Forum found');
        res.status(404).send({
            message: 'Forum not found'
        });
        return;
    }
    logger.info('Forum ' + forum.title + ' found');
    res.send(forum);

});

router.get('/category/:id', async (req, res) => {
    const forums = await Forum.find({categoryId: req.params.id});
    logger.info('Displaying forums');
    res.send(forums);
});

module.exports = router;