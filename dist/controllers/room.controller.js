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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomHandler = exports.updateRoomHandler = exports.getRoomByIdHandler = exports.searchRoomsHandler = exports.getAllRoomsHandler = exports.createRoomHandler = exports.createRoomTypeHandler = void 0;
const room_service_js_1 = require("../service/room.service.js");
const room_service_js_2 = require("../service/room.service.js");
const room_service_js_3 = require("../service/room.service.js");
/*
roomtype function is used to register a roomtype
* it also saves the room with an id that fits to the specified room type
*/
const createRoomTypeHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = request.body;
        if (!name) {
            const error = new Error("please provide a name");
            error.statusCode = 400;
            throw error;
        }
        const existingRoomtype = yield (0, room_service_js_3.findRoomTypeByName)(name);
        if (existingRoomtype) {
            response.status(200).json({ message: "RoomType already exists" });
        }
        const roomtype = yield (0, room_service_js_1.createRoomType)(name);
        return response.status(201).json({ message: "RoomType created successfully", room: roomtype });
    }
    catch (error) {
        next(error);
    }
});
exports.createRoomTypeHandler = createRoomTypeHandler;
/**
 * this is used to create a new room
 * checks for empty fields
 * checks if the room and id already exists
 */
const createRoomHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, roomtype, description, price } = request.body;
        if (!name || !roomtype || !description || !price) {
            const error = new Error("please fill in the all fields");
            error.statusCode = 400;
            throw error;
        }
        const roomType = yield (0, room_service_js_3.findRoomTypeByName)(roomtype);
        if (!roomType) {
            const error = new Error("invalid room type");
            error.statusCode = 400;
            throw error;
        }
        const existingRoom = yield (0, room_service_js_1.findRoomByName)(name);
        if (!existingRoom) {
            const newRoom = yield (0, room_service_js_1.createRoom)(name, roomType._id, description, price);
            return response.status(201).json({ message: "Room created successfully", room: newRoom });
        }
        else {
            const error = new Error("Room already exists");
            error.statusCode = 400;
            throw error;
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createRoomHandler = createRoomHandler;
const getAllRoomsHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRooms = yield (0, room_service_js_3.getAllRoomTypes)();
        return response.status(200).json(allRooms);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRoomsHandler = getAllRoomsHandler;
const searchRoomsHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filteredRooms = yield (0, room_service_js_3.filterRooms)(request);
        return response.status(200).json(filteredRooms);
    }
    catch (error) {
        next(error);
    }
});
exports.searchRoomsHandler = searchRoomsHandler;
const getRoomByIdHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomId = request.params.id;
        if (!roomId) {
            const error = new Error("please provide a  room id");
            error.statusCode = 400;
            throw error;
        }
        const room = yield (0, room_service_js_2.findRoomById)(roomId);
        if (!room) {
            const error = new Error("Room not found");
            error.statusCode = 400;
            throw error;
        }
        return response.status(200).json(room);
    }
    catch (error) {
        next(error);
    }
});
exports.getRoomByIdHandler = getRoomByIdHandler;
const updateRoomHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const { name, price } = request.body;
        if (!id || !name || !price) {
            const error = new Error("please fill all fields");
            error.statusCode = 400;
            throw error;
        }
        const updatedRoom = yield (0, room_service_js_2.updateRoomById)(id, name, price);
        if (!updatedRoom) {
            const error = new Error("Room not updated");
            error.statusCode = 400;
            throw error;
        }
        return response.status(200).json(updatedRoom);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRoomHandler = updateRoomHandler;
const deleteRoomHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        if (!id) {
            const error = new Error("please provide a room id");
            error.statusCode = 400;
            throw error;
        }
        const deletedRoom = yield (0, room_service_js_2.deleteRoomById)(id);
        if (!deletedRoom) {
            const error = new Error("Room not found");
            error.statusCode = 400;
            throw error;
        }
        return response.status(200).json({
            message: "Room deleted successfully",
            deletedRoom
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRoomHandler = deleteRoomHandler;
