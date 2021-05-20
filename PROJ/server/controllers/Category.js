const express = require('express');
const logger = require('../logger');
const router = express.Router();
const Category = require('../models/Category');

router.post('/create', async (req, res) => {
    const {title} = req.body;
    const newCategory = Category({
        title,
        createdAt: Date.now()
    })
    logger.info('New Category ' + newCategory.title + ' Created');
    await newCategory.save();
    res.send(newCategory);

});

router.get('/:id', async (req, res) => {
    const cat = await Category.findById(req.params.id);
    if(!cat){
        logger.error('No Category found');
        res.status(404).send({
            message: 'Category not found'
        });
        return;
    }
    logger.info('Category ' + cat.title + ' found');
    res.send(cat);

});

router.get('/', async (req, res) => {
    logger.info('Displaying Category');
    const cats = await Category.find({});
    res.send(cats);
});

module.exports = router;