const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');
const logger = require('../logger');
const config = require('../config')
const multer = require('multer'); 
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const mongoose = require('mongoose');

const url = config.mongoUri;
const conn = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let gfs;
  conn.once("open", () => {
    // init stream
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('uploads');
  });

// Storage
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({
    storage
  });

router.post('/create', upload.single('file'), async (req, res) => {
    console.log(req.file);
    const {title, content, forumId, userId} = req.body;
    const newThread = Thread({
        title,
        content,
        createdAt: Date.now(),
        forumId,
        userId,
        file: req.file.id
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
    gfs.files.findOne({ _id: thread.file }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
          res.send(thread);
           res.status(404);//.send({
        //   err: 'No file exists'
        // });
        return;
      }
      else{
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'application/pdf' || file.contentType === 'video/mp4' || file.contentType === 'text/plain' || file.contentType === 'audio/mpeg') {
          logger.info('Media format '+ file.contentType +' passed');
          res.send({thread: thread, file: file});
        } else {
          logger.error('Media '+ file.contentType +' format not supported');
          res.status(404);//.send({
          //   err: 'Not an image'
          // });
          return;
        }
    }    
  });

    // logger.info('Thread ' + thread.title + ' found');
    // res.send(thread);

});



router.get('/forum/:id', async (req, res) => {
    const threads = await Thread.find({forumId: req.params.id});
    logger.info('Displaying threads');
    res.send(threads);
});

module.exports = router;