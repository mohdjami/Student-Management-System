"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
function handleError(err, req, res, next) {
    if (err.isOperational) {
        res.status(err.statusCode).send({ message: err.message });
    }
    else {
        console.error(err);
        res.status(500).send({ message: "Something went wrong" });
    }
}
const handleCastErrorDB = (err) => {
    const message = `invalid ${err.path}: ${err.value}`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `duplicate field value ${value}`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `invalid input data ${errors.join(". ")}`;
    return new appError_1.default(message, 400);
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};
const sendErrorProd = (err, res) => {
    // operational trusted error send directly to the client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
        // programming error or other unknown error: don't leak details
    }
    else {
        // log the error
        console.log("ERROR", err);
        // send generic msg
        res.status(500).json({
            status: "error",
            message: "something went very wrong",
        });
    }
};
exports.default = (err, req, res, next) => {
    console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        if (err.name === "CastError") {
            error = handleCastErrorDB(error);
        }
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (err.name === "ValidationError")
            error = handleValidationErrorDB(error);
        sendErrorProd(error, res);
    }
};
