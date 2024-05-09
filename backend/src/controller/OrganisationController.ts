
import Organisation from "../models/Organisation";
import { Request,Response } from "express";
import Orgdao from '../dao/OrganisationDao'
class Org{
    public static  async sign(req:Request,res:Response){
            const {org_name,name}=req.body;
            // const Org=new Organisation({org_name,name}); //dao
            // await Org.save();
            Orgdao.signO(org_name,name);
            res.status(201).json({success:true});
    }
    public static async orguser (req:Request,res:Response): Promise<void>{
            const {org_name,name}=req.body;
            // console.log("dsfdgfcg");
            Orgdao.neworg(org_name,name); //dao
            res.status(201).json({success:true});
         }

    public static async allorg (req:Request<{},{},{}>,res:Response){
        try{ 
           const org=await Orgdao.allorgDao(); //dao

         //   console.log("Returnnng   .......................................................",org);
           
           res.send(org);
   
        }catch(error){
           console.log('error',error);
           res.status(500).json({error:'internal server error'});
        }

   }

    public static async delete(req:Request,res:Response){
        const {org_name}=req.params;
        console.log(org_name)
      //   const deleteorg=await Organisation.findByIdAndDelete(org_name); //dao
         const deleteorg= await Orgdao.delete(org_name);
         res.status(200).json(deleteorg);
      //   if(deleteorg){

      //      res.status(200).json({message:'Data deleted'});
      //   } else {
      //      res.status(404).json({ error: 'Data not found' });
      //  }
     }
    
}
export default Org;
