"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    passWord: joi_1.default.string().min(4).max(20).required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    passWord: joi_1.default.string().min(4).max(20).required(),
});
