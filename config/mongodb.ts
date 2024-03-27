import mongoose from "mongoose";

const coonectdb =async():Promise<void>=>{
    try{
        if(!process.env.MONGODB_URI){
            throw new Error("No mongoDB uri provided");
        }
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected")
    }catch(error){
        throw new Error ("couldn't conect to the database")
    }
}

export default coonectdb;