import mongoose, { Schema, Document } from "mongoose";
import RoomType from "./Roomtype"; 

interface IRoomType extends Document {
    name: string;
    roomType: mongoose.Schema.Types.ObjectId;
    description: string;
    price: number;
}

const roomSchema = new Schema<IRoomType>({
    name: {
        type: String,
        required: true
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RoomType, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const room = mongoose.model<IRoomType>("room", roomSchema);

export default room;
