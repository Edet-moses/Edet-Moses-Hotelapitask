"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("../controllers/room.controller");
const room_controller_2 = require("../controllers/room.controller");
const room_controller_3 = require("../controllers/room.controller");
const verify_jwt_1 = require("../middlewares/verify.jwt");
const user_registration_1 = require("../controllers/user.registration");
const user_registration_2 = require("../controllers/user.registration");
const router = express_1.default.Router();

router.get('/', (req, res) => {
    res.send("Salut, bienvenue dans mon hotel ");
});
router.post('/api/v1/signup', user_registration_1.signup); // User signup
router.post('/api/v1/login', user_registration_1.login); // User login
router.patch('/api/v1/forgotpassword', user_registration_2.forgotPassword);
router.delete('/api/v1/deleteusers', user_registration_2.deleteUsers);
// Public routes
router.get('/api/v1/rooms-types', room_controller_1.getAllRoomsHandler); // Get all room types
router.get('/api/v1/rooms', room_controller_2.searchRoomsHandler); // Search rooms
// Protected routes (require authentication)
router.post('/api/v1/rooms-types', verify_jwt_1.checkAdminAccess, room_controller_1.createRoomTypeHandler); // Create a new room type
router.post('/api/v1/rooms', verify_jwt_1.checkAdminAccess, room_controller_1.createRoomHandler); // Create a new room
router.get('/api/v1/rooms/:id', verify_jwt_1.checkAdminAccess, room_controller_2.getRoomByIdHandler); // Get room by ID
router.patch('/api/v1/rooms/:id', verify_jwt_1.checkAdminAccess, room_controller_3.updateRoomHandler); // Update room by ID
router.delete('/api/v1/rooms/:id', verify_jwt_1.checkAdminAccess, room_controller_3.deleteRoomHandler); // Delete room by ID
exports.default = router;
