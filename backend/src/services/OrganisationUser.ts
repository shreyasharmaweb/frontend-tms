import nodemailer from "nodemailer";
import OrgUser from "../models/OrganisationUser"; 
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "shreyasharma7051@gmail.com",
    pass: "jvcmyavhiwdpvzai",
  },
});

export const sendEmailUser=
   async (email: any)=>{
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // const user = await OrganisationUser.findOne({ email_id });
    const user = await OrgUser.findOne({  email_id:email });
    console.log(user);
    
    if(!user){
        throw new Error("not exit");
    }
       
        user.otp = otp;
        await user.save();

        var mailOptions={
          from:"shreyasharma7051@gmail.com",
          to:email,
          text:`Your OTP is ${otp}`,
    
        }
         
        transporter.sendMail(mailOptions,function(err,info){
           if(err){
            console.log("wrong email",err);
           }else{
               console.log("info",info);
           }
        })
      return ({message:"otp send succesfully",otp});
      
}