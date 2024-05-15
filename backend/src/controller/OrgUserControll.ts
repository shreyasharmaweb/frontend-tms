import { Request,Response } from "express";
import OrganisationUser from "../models/OrganisationUser";
import OrgDao from "../dao/OrgUserDao";
import OrgUser from "../models/OrganisationUser";

class OrgUserControll{
    
    public static async OrgUser(req:Request, res:Response)  {
        const {_id,email_id,first_name,last_name,organisation,dob,org_join_date} = req.body;
        console.log(_id,email_id,first_name,last_name,organisation,dob,org_join_date);
        const isUser=await OrgUser.find({$and:[{email_id},{organisation}]});
        console.log(isUser);
        if(isUser.length != 0){
                return res.status(400).send({message:"User is already exist"});
            }
        else{
        const newOrgUser=OrgDao.OrgUserDao(_id,email_id,first_name,last_name,organisation,dob,org_join_date);
           return res.status(201).send({message:""});
        }
    }
    public static async alluser(req:Request,res:Response){
        try {
            const org = await OrgDao.OrgAllUser(); 
            res.status(200).json(org); 
        } catch(err) { 
            console.log('error',err);
            res.status(500).json({error:'internal server error'});
        }
    }
}

export default OrgUserControll;