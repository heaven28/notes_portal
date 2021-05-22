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


router.get('/:filename', (req, res) => {
  console.log('image show url');
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      console.log('no file');
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      logger.info('Loading Image from MongoDB');
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      console.log('not image');
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});


module.exports = router;