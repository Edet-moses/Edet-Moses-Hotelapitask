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
exports.deleteRoomById = exports.updateRoomById = exports.findRoomById = exports.filterRooms = exports.getAllRoomTypes = exports.createRoom = exports.findRoomTypeByName = exports.findRoomByName = exports.createRoomType = void 0;
const Room_js_1 = __importDefault(require("../model/Room.js"));
const Roomtype_js_1 = __importDefault(require("../model/Roomtype.js"));
// Function to create a new room type
const createRoomType = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRoomtype = new Roomtype_js_1.default({
            name,
        });
        yield newRoomtype.save();
    }
    catch (error) {
        console.log("Error creating room type:", error);
        throw error;
    }
});
exports.createRoomType = createRoomType;
// Function to find a room by name
const findRoomByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Room_js_1.default.findOne({ name });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.findRoomByName = findRoomByName;
const findRoomTypeByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Roomtype_js_1.default.findOne({ name });
        return result;
    }
    catch (error) {
    }
});
exports.findRoomTypeByName = findRoomTypeByName;
// Function to create a new room
const createRoom = (name, roomType, description, price) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRoom = new Room_js_1.default({
            name,
            roomType,
            description,
            price,
        });
        yield newRoom.save();
    }
    catch (error) {
        throw error;
    }
});
exports.createRoom = createRoom;
// Function to get all rooms
const getAllRoomTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Roomtype_js_1.default.find();
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllRoomTypes = getAllRoomTypes;
// Function to filter rooms based on search criteria
const filterRooms = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filters = {};
        if (typeof request.query.search === 'string') {
            filters.name = { $regex: new RegExp(request.query.search, "i") };
        }
        if (typeof request.query.roomtype === 'string') {
            filters.name = { $regex: new RegExp(request.query.roomtype, "i") };
        }
        if (request.query.minprice || request.query.maxprice) {
            filters.price = {};
            if (typeof request.query.minprice === 'string') {
                filters.price.$gte = parseInt(request.query.minprice);
            }
            if (typeof request.query.maxprice === 'string') {
                filters.price.$lte = parseInt(request.query.maxprice);
            }
        }
        const filteredRooms = yield Room_js_1.default.find(filters);
        return filteredRooms;
    }
    catch (error) {
        throw error;
    }
});
exports.filterRooms = filterRooms;
// Function to find a room by ID
const findRoomById = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Room_js_1.default.findById(roomId);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.findRoomById = findRoomById;
// Function to update a room by ID
const updateRoomById = (id, name, price) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRoom = yield Room_js_1.default.findOneAndUpdate({ _id: id }, { name, price }, { new: true });
        return updatedRoom;
    }
    catch (error) {
        throw error;
    }
});
exports.updateRoomById = updateRoomById;
// Function to delete a room by ID
const deleteRoomById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRoom = yield Room_js_1.default.findByIdAndDelete(id);
        return deletedRoom;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteRoomById = deleteRoomById;
