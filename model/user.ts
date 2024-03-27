import mongoose,{Schema , Document } from "mongoose";

interface Iuser extends Document{
    email:string;
    passWord:string;
    firstName:string;
    lastName:string;
    role:string;
}

const userSchema = new Schema<Iuser>({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    passWord:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user', 'Admin', ],
        default:"user",
        required:true
    },
})

const User= mongoose.model<Iuser>("user",userSchema);

export default User;