import { Request,Response } from "express";
import SystemUser from "../models/SystemUser";
import {sendEmail} from '../services/SystemUser';
import SystemUserDao from '../dao/SystemUserDao'
class SysUser{
      
     
      public static async Sys(req:Request<{},{},{email:string}>,res:Response):Promise<any>{
        try{
          const {email}=req.body;
          const validateEmail = (email:string) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };
          if(!validateEmail(email))throw new Error("not a valid email");
          const Sys=await SystemUserDao.syssign(email);
          await sendEmail(email);
          return res.status(200).json({ valid: true, message: 'OTP is send' });

        }catch(err){
           return res.status(400).json({valid:false,message:"otp is not send"})
        }
    } 

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

