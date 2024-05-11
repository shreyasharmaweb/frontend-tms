import mongoose, { Schema } from "mongoose";
const TMSTicketSchema :Schema=new Schema({
    type:{type:String},
    key:{type:String},
    summary:{type:String},
    description:{type:String},
    assignee:{type:String},
    reporter:{type:String},
    status:{type:String},
    created_date:{type:Date},
    updated_date:{type:Date},
    due_date:{type:Date},
    
})
const TMSTicket=mongoose.model("TMSTicket",TMSTicketSchema);
export default TMSTicket;
