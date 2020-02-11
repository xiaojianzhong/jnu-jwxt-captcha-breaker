import winston from 'winston';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
    }),
    new winston.transports.File({
      filename: 'debug.log',
      level: 'debug',
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
  ],
};

const logger = winston.createLogger(options);

export default logger;
