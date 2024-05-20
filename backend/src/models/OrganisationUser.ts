import mongoose, { Schema } from "mongoose";



const OrgUserSchema:Schema = new Schema({
    email_id: { type: String, required: true }, 
    first_name: { type: String, required: true }, 
    last_name: { type: String, required: true }, 
    organisation: { type: String,  required: true }, 
    dob: { type: Date, required: true }, 
    otp:{type:Number},
    org_join_date: { type: Date, required: true }
});

const OrgUser = mongoose.model('OrgUser', OrgUserSchema);
export default OrgUser;


