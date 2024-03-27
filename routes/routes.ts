import express from 'express';
import { createRoomHandler,createRoomTypeHandler,getAllRoomsHandler } from '../controllers/room.controller';
import { searchRoomsHandler,getRoomByIdHandler } from '../controllers/room.controller';
import { updateRoomHandler,deleteRoomHandler } from '../controllers/room.controller';
import { checkAdminAccess} from '../middlewares/verify.jwt';
import { signup,login } from '../controllers/user.registration';
import {forgotPassword,deleteUsers} from '../controllers/user.registration';


const router = express.Router();


router.post('/api/v1/signup', signup); // User signup
router.post('/api/v1/login', login); // User login
router.patch('/api/v1/forgotpassword',forgotPassword);
router.delete('/api/v1/deleteusers',deleteUsers);

// Public routes
router.get('/api/v1/rooms-types', getAllRoomsHandler); // Get all room types
router.get('/api/v1/rooms',  searchRoomsHandler); // Search rooms

// Protected routes (require authentication)
router.post('/api/v1/rooms-types', checkAdminAccess, createRoomTypeHandler); // Create a new room type
router.post('/api/v1/rooms', checkAdminAccess, createRoomHandler); // Create a new room
router.get('/api/v1/rooms/:id',checkAdminAccess, getRoomByIdHandler); // Get room by ID
router.patch('/api/v1/rooms/:id', checkAdminAccess, updateRoomHandler); // Update room by ID
router.delete('/api/v1/rooms/:id', checkAdminAccess, deleteRoomHandler); // Delete room by ID





export default router;