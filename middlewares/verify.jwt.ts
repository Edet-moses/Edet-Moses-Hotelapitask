import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { findUserByEmail } from '../service/user.service'
import { Request,Response,NextFunction } from 'express';
dotenv.config();


const extractCookieFromBearerToken = (req: Request): string | null => {
    const authHeader = req.headers['authorization'];
  
    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    return authHeader.slice(7);
};

export const checkAdminAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookieValue = extractCookieFromBearerToken(req);
       
        if (!cookieValue) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("No JWT secret provided");
        }

        const decode = jwt.verify(cookieValue, process.env.JWT_SECRET) as { email: string, exp?: number };
        const email = decode.email;
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (decode.exp && decode.exp < currentTime) {
            return res.status(401).json({ message: "Token has expired" });
        }
        if (user.role === 'Admin') {
           next()
        }
        
    } catch (error) {
        console.error("Error verifying user token:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
