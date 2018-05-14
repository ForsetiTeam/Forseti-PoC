import * as winston from "winston";
import * as winstonRotate from "winston-daily-rotate-file";

winston.emitErrs = true;

const log = new winston.Logger({
    transports: [
        new winstonRotate({
            level: "debug",
            filename: `${__dirname}/../../logs/all/-all.log`,
            handleExceptions: false,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            timestamp: true,
            prepend: true,
            datePattern: "yyyy-MM-dd",
        }),
        new winston.transports.Console({
            level: "debug",
            handleExceptions: false,
            json: false,
            colorize: true,
        }),
    ],
    exitOnError: false,
});

const morganLog = new winston.Logger({
    transports: [
        new winstonRotate({
            level: "debug",
            filename: `${__dirname}/../../logs/morgan/-morgan.log`,
            handleExceptions: false,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            timestamp: true,
            prepend: true,
            datePattern: "yyyy-MM-dd",
        }),
    ],
    exitOnError: false,
});

const dialogLog = new winston.Logger({
    transports: [
        new winstonRotate({
            filename: `${__dirname}/../../logs/dialogs/-dialog.log`,
            maxsize: "100m",
            maxFiles: 5,
            timestamp: false,
            prepend: true,
            datePattern: "yyyy-MM-dd",
        }),
    ],
    exitOnError: false,
});

const logStream = {
    write: (message, encoding) => {
        morganLog.info(message);
    },
};

export {
    log,
    dialogLog,
    logStream,
};
