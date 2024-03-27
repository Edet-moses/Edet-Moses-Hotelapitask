import   {signUpSchema,loginSchema} from '../config/joi.js'
import Joi from 'joi';


 export const validateSignupInput=(email:string,passWord:string,firstName:string,lastName:string)=>{
      try{
        const result= signUpSchema.validate({email,passWord,firstName,lastName})
        return result;
      }catch(error:any){
        throw new Error ("invalid input"+error.message);
      }
}

export const validateLoginInput= (email:string,passWord:string)=>{
    try{
      const result= loginSchema.validate({email,passWord})
      return result;
    }catch(error:any){
      throw new Error ("invalid input"+error.message);
    }
}
