"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_service_1 = require("../service/user.service");
dotenv_1.default.config();
const extractCookieFromBearerToken = (req) => {
    const authHeader = req.headers['authorization'];
    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.slice(7);
};
const checkAdminAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookieValue = extractCookieFromBearerToken(req);
        if (!cookieValue) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error("No JWT secret provided");
        }
        const decode = jsonwebtoken_1.default.verify(cookieValue, process.env.JWT_SECRET);
        const email = decode.email;
        const user = yield (0, user_service_1.findUserByEmail)(email);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (decode.exp && decode.exp < currentTime) {
            return res.status(401).json({ message: "Token has expired" });
        }
        if (user.role === 'Admin') {
            next();
        }
    }
    catch (error) {
        console.error("Error verifying user token:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
});
exports.checkAdminAccess = checkAdminAccess;
