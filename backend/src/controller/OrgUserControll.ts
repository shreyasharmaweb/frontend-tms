import { Request, Response } from "express";
import OrganisationUser from "../models/OrganisationUser";
import OrgDao from "../dao/OrgUserDao";
import OrgUser from "../models/OrganisationUser";
import jwtService from "../helper/jwt.helper";
import AdminAuthorizer from "../helper/auth-admin";
import { sendEmailUser } from "../services/OrganisationUser";

class OrgUserControll {

    public static async OrgUser(req: Request, res: Response) {
        const { _id, email_id, first_name, last_name, organisation, dob, org_join_date } = req.body;
       
        const isUser = await OrgUser.find({ $and: [{ email_id }, { organisation }] });
      
        if (isUser.length != 0) {
            return res.status(400).send({ message: "User is already exist" });
        }
        else {
            const newOrgUser = OrgDao.OrgUserDao(_id, email_id, first_name, last_name, organisation, dob, org_join_date);
            return res.status(201).send({ message: "" });
        }
    }
    public static async alluser(req: Request, res: Response) {
         
        const { authorized } = await AdminAuthorizer.authorizeAdmin(req, res);
        if (!authorized) {
          return res.status(403).json({
            success: false,
            message: "Unauthorized: Only authenticated users can view tickets",
          });
        }

        try {
            const org = await OrgDao.OrgAllUser();
            res.status(200).json(org);
        } catch (err) {
            console.log('error', err);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    public static async otpSendUser(req: Request, res: Response) {

        const { email_id } = req.body;
       
        try {
            const response = await sendEmailUser(email_id);
            return res.status(200).send(response);
        } catch (err) {
            res.status(500).json({ error: 'otp not send' });
        }
    }
    public static async UserLogin(req: Request, res: Response) {

        try{
        const { email_id, organisation, otp } = req.body;
       
        const isUser = await OrgUser.find({ $and: [{ email_id }, { organisation }] });
        
        if (isUser.length == 0) {
            return res.status(400).send({success:false, message: "User not exist in Organisation" });
        }
      
        if (isUser[0].otp != otp) {
            return res.status(401).send({ success: false, message: "Invalid OTP" });
        }
        const token = jwtService.signToken({ email:email_id, role: "user", organisation: organisation });
       
        return res.status(202).send({ success:true , message: "Login Successfully " , token });
    }
    catch(error){
        return res.status(405).send({ success:false , message: "Error "  });
    }

    }
}
export default OrgUserControll;
