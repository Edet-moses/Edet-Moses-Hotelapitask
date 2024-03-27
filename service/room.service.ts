import room from '../model/Room.js';
import Roomtypes from '../model/Roomtype.js';
import { Request } from 'express';

// Function to create a new room type
export const createRoomType = async (name:string) => {
    try {
        const newRoomtype = new Roomtypes({
            name,
        });
        await newRoomtype.save();
    } catch (error) {
        console.log("Error creating room type:", error);
        throw error;
    }
}

// Function to find a room by name
export const findRoomByName = async (name:string) => {
    try {
        const result = await room.findOne({ name });
        return result;
    } catch (error) {
        throw error;
    }
}

export const findRoomTypeByName = async (name:string) => {
    try{
    const result = await Roomtypes.findOne({ name});
    return result
    }catch(error){
    }

};

// Function to create a new room
export const createRoom = async (name:string, roomType:number|string, description:string, price:string) => {
    try {
        const newRoom = new room({
            name,
            roomType,
            description,
            price,
        });
        await newRoom.save();
    } catch (error) {
        throw error;
    }
};

// Function to get all rooms
export const getAllRoomTypes = async () => {
    try {
        const result = await Roomtypes.find();
        return result;
    } catch (error) {
        throw error;
    }
}

// Function to filter rooms based on search criteria
export const filterRooms = async (request: Request) => {
    try {
        let filters: any = {};
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
        const filteredRooms = await room.find(filters);
        return filteredRooms;
    } catch (error) {
        throw error;
    

    }
}

// Function to find a room by ID
export const findRoomById = async (roomId:number|string) => {
    try {
        const result = await room.findById(roomId);
        return result;
    } catch (error) {
        throw error;
    }
}

// Function to update a room by ID
export const updateRoomById = async (id:number|string, name:string,  price:string) => {
    try {
        const updatedRoom = await room.findOneAndUpdate({ _id: id }, { name, price }, { new: true });
        return updatedRoom;
    } catch (error) {
        throw error;
    }
}

// Function to delete a room by ID
export const deleteRoomById = async (id:number|string) => {
    try {
        const deletedRoom = await room.findByIdAndDelete(id);
        return deletedRoom;
    } catch (error) {
        throw error;
    }
}