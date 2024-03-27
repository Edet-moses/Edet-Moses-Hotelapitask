import { Request, Response,NextFunction } from "express";

// interface customErrorHandler extends Error{
//   statusCode:number;
// }

export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    const errorStatus = err.statusCode||500
    const errorMessage = err.message|| "something went wrong";
    res.status(errorStatus).json({
      success:false,
      message: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
  };
  
 