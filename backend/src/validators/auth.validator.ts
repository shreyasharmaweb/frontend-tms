import {z} from 'zod'
import mongose from 'mongoose'
//creating the schema
// email_id: { type: String, required: true }, 
// first_name: { type: String, required: true }, 
// last_name: { type: String, required: true }, 
// organisation: { type: String,  required: true }, 
// dob: { type: Date, required: true }, 
// org_join_date: { type: Date, required: true }
const formSchema= z.object({
    email_id:z
    .string({required_error:"Email is required"})
    .trim().min(10,{message:"Email must be at least 10"})
    .max(255,{message:"Name must not be more than 255 characters"}),
    first_name:z
    .string({required_error:"First Name is required"})
    .trim().min(3,{message:"First Name must be at least 3"})
    .max(20,{message:"Name must not be more than 20 characters"}),
    last_name:z
    .string({required_error:"Last Name is required"})
    .trim().min(3,{message:"Last Name must be at least 3"})
    .max(20,{message:"Name must not be more than 20 characters"}),
    organisation:z
    .string({required_error:"Organization is required"})
    .trim().min(2,{message:"Organization must be at least 10"})
    .max(255,{message:"Name must not be more than 255 characters"}),
    dob:z
    .string({ required_error: "Date of Birth is required" })
    .refine((value) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(value);
    }, { message: "Date of Birth must be in the format YYYY-MM-DD" }),
    org_join_date:z.string({ required_error: "Date of Birth is required" })
    .refine((value) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return dateRegex.test(value);
    }, { message: "Date of Birth must be in the format YYYY-MM-DD" }),
})
export default formSchema;