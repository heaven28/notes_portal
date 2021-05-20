
const winston = require('winston');

const logConfiguration = {
    'level': 'info',
    'transports': [
        new winston.transports.File({
            filename: './logs/note_portal.log'
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;