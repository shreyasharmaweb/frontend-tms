import mongoose, { Schema } from "mongoose";


const SysUserSchema:Schema=new Schema({
    email:{type:String},
    otp: {type:Number},
});

const SystemUser=mongoose.model('SystemUser',SysUserSchema);
export default SystemUser;
