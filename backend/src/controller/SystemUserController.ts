import { Request,Response } from "express";
import SystemUser from "../models/SystemUser";
import {sendEmail} from '../services/SystemUser';
import SystemUserDao from '../dao/SystemUserDao'
class SysUser{
      
     //comments in all functions
      public static async Sys(req:Request<{},{},{email:string}>,res:Response):Promise<any>{
        const {email}=req.body;
        const Sys=await SystemUserDao.syssign(email);
        console.log("inside controller",Sys);
        await sendEmail(email);   
    } //cam-function
    //Request<{},{},{}>

    public static async otpUser(req:Request<{},{},{email:string,otp:string}>,res:Response){
      const{email,otp}=req.body;
      const user = await SystemUserDao.otp(email);
  
      if (!user) {
        return res.status(404).json({ valid: false, message: 'User not found' });
      }
      
      if (user.otp == otp) {
        return res.status(200).json({ valid: true, message: 'OTP is valid' });
      }
      else return res.status(400).json({ valid: false, message: 'Invalid or expired OTP',success:true});
    
    }
}

export default SysUser;

