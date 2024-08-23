import { z } from "zod"

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password is required and must be at least 6 characters" }),
    reEnterPassword: z
      .string()
      .min(6, { message: "Reenter Password is required, must be same as above" }),
  })
  .refine((data) => data.password === data.reEnterPassword, {
    message: "Passwords do not match",
    path: ["reEnterPassword"], // This will attach the error message to the reEnterPassword field
  });

export const ResetSchema = z.object({
   email: z.string().email({message:"Email is required"}),
   })

export const LoginSchema = z.object({
    email: z.string().email({message:"Email is required"}),
    password : z.string().min(1,{message:"Password is required"}),
    })
  
 export const RegisterSchema = z.object({
    email: z.string().email({message:"Email is required"}),
    password : z.string().min(6,{message:"Password is required and must be at least 6 characters"}),
    name: z.string().min(3,{message:"Name is required and must be at least 3 characters"}),
    })
  