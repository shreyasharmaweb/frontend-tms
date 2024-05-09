import mongoose, { Schema } from "mongoose";


const OrgSchema :Schema= new Schema({
    org_name: {type:String},
    name: {type:String},
   
});

const Organisation = mongoose.model('Organisation', OrgSchema);
export default Organisation;
