import { createRoom, createRoomType, findRoomByName,  } from '../service/room.service.js'
import {findRoomById, updateRoomById, deleteRoomById} from '../service/room.service.js';
import{ filterRooms,   getAllRoomTypes,findRoomTypeByName} from '../service/room.service.js';
import { NextFunction, Request,Response } from 'express';
/*
roomtype function is used to register a roomtype 
* it also saves the room with an id that fits to the specified room type
*/ 

export const createRoomTypeHandler=async(request:Request, response:Response,next:NextFunction)=>{
  try {
    const { name } = request.body;
    if (!name) {
        const error= new Error ("please provide a name");
        (error as any).statusCode=400;
         throw error
    }
    const existingRoomtype= await findRoomTypeByName(name)
    if(existingRoomtype){
      response.status(200).json({message: "RoomType already exists"});  
    }
   const roomtype = await createRoomType(name)
   return response.status(201).json({ message: "RoomType created successfully", room: roomtype });
  } catch (error) {
    next(error);
  }
}
/**
 * this is used to create a new room
 * checks for empty fields 
 * checks if the room and id already exists
 */
export const createRoomHandler= async(request:Request, response:Response,next:NextFunction)=>{
  try {
    const {name, roomtype,description,price} = request.body;
    if ( !name || !roomtype||!description||!price){
        const error= new Error ("please fill in the all fields");
        (error as any).statusCode=400;
         throw error
    }
    const roomType= await findRoomTypeByName(roomtype)
    if (!roomType) {
        const error= new Error ("invalid room type");
        (error as any).statusCode=400;
         throw error
    }
    const existingRoom = await findRoomByName(name)
    if (!existingRoom) {
     const newRoom= await createRoom(name,roomType._id,description,price)
   return response.status(201).json({ message: "Room created successfully", room: newRoom })
    }else{
        const error= new Error ("Room already exists");
        (error as any).statusCode=400;
         throw error
    }
    
  } catch (error) {
    next(error);
  }
}
export const getAllRoomsHandler = async(request:Request, response:Response,next:NextFunction)=>{
    try {
        const allRooms= await getAllRoomTypes()
        return response.status(200).json(allRooms);
    } catch (error) {
        next(error);
    }
}
export const searchRoomsHandler =async(request:Request, response:Response,next:NextFunction)=>{
    try{
 const filteredRooms = await  filterRooms(request)
 return response.status(200).json(filteredRooms);
}catch(error){
next(error);
}
}

export const getRoomByIdHandler = async (request:Request, response:Response,next:NextFunction) => {
    try {
        const roomId = request.params.id;
        if (!roomId) {
            const error= new Error ("please provide a  room id");
            (error as any).statusCode=400;
             throw error
        }

        const room = await findRoomById(roomId);
        if (!room) {
            const error= new Error ("Room not found");
            (error as any).statusCode=400;
             throw error
        }

        return response.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

export const updateRoomHandler = async (request:Request, response:Response,next:NextFunction) => {
    try {
        const { id } = request.params;
        const { name, price } = request.body;
        if (!id || !name  || !price) {
            const error= new Error ("please fill all fields");
            (error as any).statusCode=400;
             throw error
        }

        const updatedRoom = await updateRoomById(id, name, price);
        if (!updatedRoom) {
            const error= new Error ("Room not updated");
            (error as any).statusCode=400;
             throw error
        }

        return response.status(200).json(updatedRoom);
    } catch (error) {
        next(error)
    }
}

export const deleteRoomHandler = async (request:Request, response:Response,next:NextFunction) => {
    try {
        const { id } = request.params;
        if (!id) {
            const error= new Error ("please provide a room id");
            (error as any).statusCode=400;
             throw error
        }

        const deletedRoom = await deleteRoomById(id);
        if (!deletedRoom) {
            const error= new Error ("Room not found");
            (error as any).statusCode=400;
             throw error
        }

        return response.status(200).json({
            message: "Room deleted successfully",
            deletedRoom
        });
    } catch (error) {
       next(error);
    }
}