import bcrypt,{hash,compare} from "bcryptjs";

import User from "../model/user";

export const hashPassword =async(password:string)=>{  
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        return hashedPassword;
    }catch(error){
        throw new Error ("password hashing failed"+error)
      
    }
}

export const comparePassword =async(email:string,password:string,)=>{
    try{
      const findUser = await User.findOne({email})
      if(!findUser){
        throw new Error ("User not found")
      }
      const isMatch = await bcrypt.compare(password,findUser.passWord);
      return isMatch
    }catch(error){
        throw new Error ("password comparison failed"+error)
        
    }

}