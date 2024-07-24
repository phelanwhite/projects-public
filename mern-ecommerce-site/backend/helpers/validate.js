import Joi from "joi";

export const signup = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.ref('password')
})

export const signin = Joi.object({
    email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
    password: Joi.string().required(),
})

// export const updateMe = Joi.object({
//     name: Joi.string().required(),
//     ...Joi.any()
// })