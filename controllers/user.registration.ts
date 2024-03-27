import { comparePassword } from "../config/bcripty";
import {saveUser,findUserByEmail,updatePassword,deleteUser} from '../service/user.service';
import { Request,Response ,NextFunction} from "express";
import {validateSignupInput, validateLoginInput} from '../utils/utils'
import jwt from 'jsonwebtoken';
import {errorHandler} from '../middlewares/errorHander';
 

export const signup = async (req: Request, res: Response,next: NextFunction) => {
    try{
     const{email,passWord,firstName,lastName}=req.body;
     const inputValidation=  validateSignupInput(email,passWord,firstName,lastName)
     if(!inputValidation){
       const error =new Error ("invalid input");
       (error as any).statusCode=400;
        throw error
     }
     const exisitingUser= await findUserByEmail(email);
     if(exisitingUser){
        const error =new Error ("user already exists, try login");
        (error as any).statusCode=400;
         throw error
     }
     let role= "user";
     const companyEmailRegex = /^[^@\s]+@(?:[^.@\s]+\.)?courage\.com$/;
     if(companyEmailRegex.test(email)){
         role= "Admin";
     }
     await saveUser(email,passWord,firstName,lastName,role);
     res.status(201).json({success:true,message:"User created successfully"})

    }catch(error){
        next(error);
    }
}

export const login = async (req: Request, res: Response,next: NextFunction) => {
    try{
        const {email,passWord}=req.body
        const inputValidation=  validateLoginInput(email,passWord)
        if(!inputValidation){
            const error =new Error ("invalid input");
            (error as any).statusCode=400;
             throw error
        }
       const result = await comparePassword(email,passWord)
       if(!result){
        const error =new Error("invalid password");
        (error as any).statusCode=400;
         throw error
       }
       
      const payload= {email}
      if(!process.env.JWT_SECRET){
        const error= new Error ("JWT secret is required");
        (error as any).statusCode=400;
         throw error
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '1h'})
      return res.status(200).json({message:"user successfully login",token});
   
    }catch(error){
       next(error);
    }
}
export const forgotPassword = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            const error= new Error ("user not found");
            (error as any).statusCode=400;
             throw error
        }
        const userId = existingUser._id;
        const updatedUser = await updatePassword(userId, password);
        if (!updatedUser) {
            const error= new Error ("could not update password");
            (error as any).statusCode=400;
             throw error
        }
        return res.status(200).json({message:"password change successful"});
    } catch (error) {
        next(error);
    }
 }
 export const deleteUsers= async(req: Request, res: Response,next:NextFunction) =>{
    try{
        const {email}=req.body;
        if(!email){
            res.status(400)
            throw new Error("please enter an email address")
            
        }
       const getuserid= await findUserByEmail(email)
       if(!getuserid){
        const error= new Error ("user not found");
        (error as any).statusCode=400;
         throw error
       }
        const id = getuserid._id
        const deletedUser = await deleteUser(id);
        if(!deletedUser){
            const error= new Error ("could not delete user");
            (error as any).statusCode=400;
             throw error
        }
        return res.status(200).json({message:"user deleted successfully"});
    }catch(error){
        next(error);
    }
 }