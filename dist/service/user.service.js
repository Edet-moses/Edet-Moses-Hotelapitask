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
exports.deleteUser = exports.updatePassword = exports.findUserByEmail = exports.saveUser = void 0;
const bcripty_1 = require("../config/bcripty");
const user_1 = __importDefault(require("../model/user"));
const saveUser = (email, passWord, firstName, lastName, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, bcripty_1.hashPassword)(passWord);
        const user = new user_1.default({
            email,
            passWord: hashedPassword,
            firstName,
            lastName,
            role
        });
        return yield user.save();
    }
    catch (error) {
        throw new Error("Could not save user" + error);
    }
});
exports.saveUser = saveUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.default.findOne({ email });
        return result;
    }
    catch (error) {
        throw new Error("Could not find user" + error);
    }
});
exports.findUserByEmail = findUserByEmail;
const updatePassword = (userid, passWord) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield (0, bcripty_1.hashPassword)(passWord);
        const result = yield user_1.default.findOneAndUpdate({ _id: userid }, { passWord: hashedPassword }, { new: true });
        return result;
    }
    catch (error) {
        throw new Error("Could not update password" + error);
    }
});
exports.updatePassword = updatePassword;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUser = yield user_1.default.findByIdAndDelete(id);
        return deleteUser;
    }
    catch (error) {
        throw new Error("Could not delete user" + error);
    }
});
exports.deleteUser = deleteUser;
