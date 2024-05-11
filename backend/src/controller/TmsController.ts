import { Request,Response } from "express";
import TmsDao from '../dao/TmsDao'
class TmsControl{
    
    public static async tms(req:Request,res:Response){
        const{type,key,summary,description,assignee,reporter,status,created_date,updated_date,due_date}=req.body;
        //dao
        // let newTMSTicket=new TMSTicket({type,key,summary,description,assignee,reporter,status,created_date,updated_date,due_date});
        // await newTMSTicket.save();
        let newTMSTicket=await TmsDao.tmsdao(type,key,summary,description,assignee,reporter,status,created_date,updated_date,due_date);
        res.status(201).json({success:true,newTMSTicket});
    }

}
export default TmsControl;
//backend-file,folder=cam
//folder-file=pascle
