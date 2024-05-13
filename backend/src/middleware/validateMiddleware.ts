import { Request,Response,NextFunction } from "express"
import {z,ZodError} from 'zod'

class Validation{
    public static validate(schema :z.ZodTypeAny){
         return (req:Request,res:Response,next:NextFunction)=>{
            schema.parse(req.body);
            next();
         }
    }
}
export default Validation;