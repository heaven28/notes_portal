
// %{GREEDYDATA:raw_timestamp}  \[%{LOGLEVEL:level}\]  \[%{GREEDYDATA:message}\]
const winston = require('winston');

const logConfiguration = {
    'level': 'info',
    'transports': [
        new winston.transports.File({
            filename: './logs/note_portal.log'
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD/MMM/YYYY:HH:mm:ss'
        }),
        winston.format.printf(info => `${[info.timestamp]}  [${info.level}]  [${info.message}]`),
    )
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;