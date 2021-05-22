const express  = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config')
const Grid = require('gridfs-stream');
const path = require('path');


mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use('/api/auth', require('./controllers/Auth'));
app.use('/api/category', require('./controllers/Category'));
app.use('/api/forum', require('./controllers/Forum'));
app.use('/api/thread', require('./controllers/Thread'));
app.use('/api/post', require('./controllers/Post'));
app.use('/api/image', require('./controllers/Image'));


app.get('*', (req, res) => {
    res.status(201);
    res.sendFile(path.join(__dirname, "..", "client/build/index.html"));
    res.end();
});

const PORT = 5005;
app.listen(PORT, () => console.log('Server running at port ' + PORT));
