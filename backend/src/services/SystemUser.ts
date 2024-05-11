import nodemailer from "nodemailer";
import SystemUser from "../models/SystemUser";
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

export const sendEmail=
   async (email: any)=>{
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // const user = await OrganisationUser.findOne({ email_id });
    const user = await SystemUser.findOne({ email });
    if(!user){
         
    }else{
          user.otp = otp;
          await user.save();
    }
    // SystemUser.otp = otp;
    

    console.log("Inside mail")
    var mailOptions={
      from:"shreyasharma7051@gmail.com",
      to:email,
      text:`Your OTP is ${otp}`,

    }
     
    transporter.sendMail(mailOptions,function(err,info){
       if(err){
        console.log(err);
       }else{
           console.log(info);
       }
    })
}