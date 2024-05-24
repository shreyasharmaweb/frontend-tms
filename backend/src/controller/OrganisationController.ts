import { Request, Response } from "express";
import Orgdao from "../dao/OrganisationDao";
import Organisation from "../models/Organisation"
import AdminAuthorizer from "../helper/auth-admin";
class Org {
  /// new user organisation vali ke liye
  public static async sign(req: Request, res: Response) {
    const { authorized } = await AdminAuthorizer.authorizeAdmin(req, res);
    if (!authorized) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only authenticated users can view tickets",
      });
    }

    const { org_name, name } = req.body;
    const user= await Organisation.find({org_name});
    if(user.length>0){
      return res.status(400).json({error:"Same key exist"});
    }else{
    await Orgdao.signO(org_name, name);
    res.status(201).json({ success: true });
    }
  }

  public static async orguser(req: Request, res: Response): Promise<void> {
    const { org_name, name } = req.body;
    Orgdao.neworg(org_name, name);
    res.status(201).json({ success: true });
  }

  public static async allorg(req: Request<{}, {}, {}>, res: Response) {
    const { authorized } = await AdminAuthorizer.authorizeAdmin(req, res);
    if (!authorized) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only authenticated users can view tickets",
      });
    }
    try {

      const org = await Orgdao.allorgDao();

      res.send(org);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "internal server error" });
    }
  }

  public static async delete(req: Request, res: Response) {
    const { org_name } = req.params;
    console.log(org_name);
    const deleteorg = await Orgdao.delete(org_name);
    res.status(200).json(deleteorg);
  }
}
export default Org;
