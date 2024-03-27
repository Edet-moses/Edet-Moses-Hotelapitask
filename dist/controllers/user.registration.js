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
exports.deleteUsers = exports.forgotPassword = exports.login = exports.signup = void 0;
const bcripty_1 = require("../config/bcripty");
const user_service_1 = require("../service/user.service");
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, passWord, firstName, lastName } = req.body;
        const inputValidation = (0, utils_1.validateSignupInput)(email, passWord, firstName, lastName);
        if (!inputValidation) {
            const error = new Error("invalid input");
            error.statusCode = 400;
            throw error;
        }
        const exisitingUser = yield (0, user_service_1.findUserByEmail)(email);
        if (exisitingUser) {
            const error = new Error("user already exists, try login");
            error.statusCode = 400;
            throw error;
        }
        let role = "user";
        const companyEmailRegex = /^[^@\s]+@(?:[^.@\s]+\.)?courage\.com$/;
        if (companyEmailRegex.test(email)) {
            role = "Admin";
        }
        yield (0, user_service_1.saveUser)(email, passWord, firstName, lastName, role);
        res.status(201).json({ success: true, message: "User created successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, passWord } = req.body;
        const inputValidation = (0, utils_1.validateLoginInput)(email, passWord);
        if (!inputValidation) {
            const error = new Error("invalid input");
            error.statusCode = 400;
            throw error;
        }
        const result = yield (0, bcripty_1.comparePassword)(email, passWord);
        if (!result) {
            const error = new Error("invalid password");
            error.statusCode = 400;
            throw error;
        }
        const payload = { email };
        if (!process.env.JWT_SECRET) {
            const error = new Error("JWT secret is required");
            error.statusCode = 400;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "user successfully login", token });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield (0, user_service_1.findUserByEmail)(email);
        if (!existingUser) {
            const error = new Error("user not found");
            error.statusCode = 400;
            throw error;
        }
        const userId = existingUser._id;
        const updatedUser = yield (0, user_service_1.updatePassword)(userId, password);
        if (!updatedUser) {
            const error = new Error("could not update password");
            error.statusCode = 400;
            throw error;
        }
        return res.status(200).json({ message: "password change successful" });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const deleteUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400);
            throw new Error("please enter an email address");
        }
        const getuserid = yield (0, user_service_1.findUserByEmail)(email);
        console.log(getuserid);
        if (!getuserid) {
            const error = new Error("user not found");
            error.statusCode = 400;
            throw error;
        }
        const id = getuserid._id;
        const deletedUser = yield (0, user_service_1.deleteUser)(id);
        if (!deletedUser) {
            const error = new Error("could not delete user");
            error.statusCode = 400;
            throw error;
        }
        return res.status(200).json({ message: "user deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUsers = deleteUsers;
