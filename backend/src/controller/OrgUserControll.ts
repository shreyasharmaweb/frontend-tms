import { Request,Response } from "express";
import OrganisationUser from "../models/OrganisationUser";
import OrgDao from "../dao/OrgUserDao";
class OrgUserControll{
    
    public static async OrgUser(req:Request, res:Response)  {
        const {id,email_id,organisation,first_name,last_name,dob,org_join_date} = req.body;
        //new OrganisationUser({id,email_id,organisation,first_name,last_name,dob,org_join_date});
        const newOrgUser=OrgDao.OrgUserDao(id,email_id,organisation,first_name,last_name,dob,org_join_date);
        
        res.status(201).json(newOrgUser);
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