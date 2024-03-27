import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    passWord: joi.string().min(4).max(20).required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
})

 export const loginSchema= joi.object({
    email: joi.string().email().required(),
    passWord: joi.string().min(4).max(20).required(),
})