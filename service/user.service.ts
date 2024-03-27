import { emit } from 'process';
import {hashPassword ,comparePassword} from '../config/bcripty';
import User from '../model/user';


export const saveUser= async(email:string, passWord: string, firstName: string, lastName: string, role: string)=> {
  try{
    const hashedPassword = await hashPassword(passWord);
    const user =  new User({
        email,
        passWord:hashedPassword,
        firstName,
        lastName,
        role
    });
    return await user.save();
  }catch(error){
    throw new Error("Could not save user"+ error)
  }
}

export const findUserByEmail= async(email:string)=>{
    try{
        const result= await User.findOne({email});
        return result;
    }catch(error){
        throw new Error("Could not find user"+ error)
    }
}

export const updatePassword= async(userid:string,passWord:string)=>{
    try{
        const hashedPassword:string= await hashPassword(passWord);
        const result= await User.findOneAndUpdate({_id:userid},{passWord:hashedPassword},{new:true});
        return result;
    }catch(error){
        throw new Error("Could not update password"+ error)
    }
}

export const deleteUser= async(id:string)=>{
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        return deleteUser;
    }catch(error){
        throw new Error("Could not delete user"+ error)
    }
}