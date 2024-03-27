"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// interface customErrorHandler extends Error{
//   statusCode:number;
// }
const errorHandler = (err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "something went wrong";
    res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};
exports.errorHandler = errorHandler;
