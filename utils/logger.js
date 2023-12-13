import winston from "winston";

export const logger=winston.createLogger({
    level:"info",
    format:winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports:[
        
        new winston.transports.Console(),
        new winston.transports.File({filename:"errors.log",level:"error"})
    ]
})

export const addLoggerMiddleware=(req, res, next)=>{
    req.logger=logger;
    next();
}